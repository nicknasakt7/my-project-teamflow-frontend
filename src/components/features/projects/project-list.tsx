'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useProjects } from '@/lib/api/project/hooks/useProjects';
import ProjectCard from './project-card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { ProjectStatus } from '@/lib/api/project/project.type';

type ProjectListProps = {
  search?: string;
  status?: ProjectStatus;
};

const LIMIT = 12;

export default function ProjectList({ search, status }: ProjectListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(() => {
    const p = Number(searchParams.get('page'));
    return p > 0 ? p : 1;
  });

  const handlePageChange = (p: number) => {
    setPage(p);
    router.replace(`/projects?page=${p}`, { scroll: false });
  };

  const { data, isLoading } = useProjects({ page, limit: LIMIT, search, status });

  const projects = data?.projects ?? [];
  const total = data?.meta.total ?? 0;
  const totalPages = Math.ceil(total / LIMIT);
  const showing = projects.length;

  return (
    <div className="flex flex-col gap-4">
      {/* Count info */}
      <p className="text-sm text-muted-foreground">
        Showing <span className="font-medium text-foreground">{showing}</span> of{' '}
        <span className="font-medium text-foreground">{total}</span> projects
      </p>

      {/* Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 border-2 px-8 py-4 rounded-lg min-h-40">
        {isLoading ? (
          <p className="text-muted-foreground col-span-full text-center py-10">Loading...</p>
        ) : projects.length === 0 ? (
          <p className="text-muted-foreground col-span-full text-center py-10">No projects found</p>
        ) : (
          projects.map(project => <ProjectCard key={project.id} {...project} page={page} />)
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-end gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <span className="text-sm">
            Page {page} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

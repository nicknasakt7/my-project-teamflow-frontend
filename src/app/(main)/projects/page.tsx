import InputFilter from '@/components/features/projects/input-filter';
import ProjectCard from '@/components/features/projects/project-card';

import { mockProjects } from '@/components/mocks/mock-data';
import { Button } from '@/components/ui/button';

import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function ListProjectPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Title section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Projects</h1>
          <p className="text-muted-foreground">
            Manage and track all team projects
          </p>
        </div>

        <Button className="gap-2" asChild>
          <Link href="/projects/create" className="text-xl">
            <Plus className="size-5" />
            Create Project
          </Link>
        </Button>
      </div>

      {/* Search + Filter */}
      <InputFilter />
      {/* Project grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* cards */}
        {mockProjects.map(project => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </div>
  );
}

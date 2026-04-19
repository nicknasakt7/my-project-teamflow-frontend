import ProjectsContent from '@/components/features/projects/projects-content';

import { Button } from '@/components/ui/button';

import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function ListProjectPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Title section */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col space-y-2">
          <h1 className="text-4xl font-semibold">Projects</h1>
          <p className="text-xl text-muted-foreground">
            Manage and track all team projects
          </p>
        </div>

        <Button className="gap-2" asChild>
          <Link
            href="/projects/create"
            className="text-sm w-44 h-10 font-semibold rounded-full"
          >
            <Plus className="size-5" />
            Create Project
          </Link>
        </Button>
      </div>

      <ProjectsContent />
    </div>
  );
}

import { Card, CardContent } from '@/components/ui/card';
import { Folder } from 'lucide-react';

type ProjectCardProps = {
  project?: { id: string; title: string } | null;
};

export function ProjectCard({ project }: ProjectCardProps) {
  if (!project) return null;
  return (
    <Card className="border-l-4 border-l-teal-400 shadow-md">
      <CardContent className="p-4">
        <div className="flex items-center gap-1.5 mb-2">
          <Folder className="size-4 text-teal-500 dark:text-teal-400" />
          <p className="text-xs font-semibold uppercase tracking-wider text-teal-500 dark:text-teal-400">Project</p>
        </div>
        <p className="font-semibold text-base">{project.title}</p>
      </CardContent>
    </Card>
  );
}

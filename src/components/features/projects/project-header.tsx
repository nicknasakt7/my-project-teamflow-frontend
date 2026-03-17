import Link from 'next/link';
import CancelProjectButton from './buttons/cancel-project-button';
import { ArrowLeft, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
type ProjectHeaderProps = {
  projectId: string;
};

export default function ProjectHeader({ projectId }: ProjectHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      <Link
        href="/projects"
        className="gap-4 text-md font-semibold text-muted-foreground flex justify-start items-center pl-2 hover:bg-accent w-60 h-8 rounded-xl"
      >
        <ArrowLeft />
        Back to Projects
      </Link>

      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-semibold">E-Commerce Platform Redesign</h1>

        <span className="rounded-full bg-green-100 px-4 py-2text-xs text-green-700">
          Active
        </span>
      </div>

      <p className="text-muted-foreground text-lg">
        Complete overhaul of the consumer-facing e-commerce platform with modern
        UI/UX and improved performance.
      </p>

      <div className="flex items-center gap-6 text-muted-foreground text-lg">
        <span>Due April 30, 2026</span>
        <span>3/5 tasks done</span>
        <span>4 members</span>
      </div>

      <div className="flex gap-3">
        <Link href={`/projects/${projectId}/create-task`}>
          <Button className="rounded-md bg-primary h-11 w-30 text-md text-accent">
            <Plus />
            Add Task
          </Button>
        </Link>

        <CancelProjectButton />
      </div>
    </div>
  );
}

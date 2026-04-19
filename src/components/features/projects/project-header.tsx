'use client';

import Link from 'next/link';
import ProjectActions from './buttons/project-actions';
import { ArrowLeft, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { useProjectDetail } from '@/lib/api/project/hooks/useProjectDetail';
import { Skeleton } from '@/components/ui/skeleton';
import type { ProjectStatus } from '@/lib/api/project/project.type';
import { allPositions } from '@/constants/positions';

const statusStyles: Record<ProjectStatus, string> = {
  ACTIVE:    'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  COMPLETED: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  OVERDUE:   'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  CANCELED:  'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400',
};

const statusLabel: Record<ProjectStatus, string> = {
  ACTIVE:    'Active',
  COMPLETED: 'Completed',
  OVERDUE:   'Overdue',
  CANCELED:  'Canceled',
};

const positionLabel = (pos: string) =>
  allPositions.find(p => p.value === pos)?.label ?? pos;

type ProjectHeaderProps = {
  projectId: string;
};

export default function ProjectHeader({ projectId }: ProjectHeaderProps) {
  const { data: session } = useSession();
  const role = session?.user?.roleType;
  const isAdmin = role === 'ADMIN' || role === 'SUPER_ADMIN';

  const { data: project, isLoading } = useProjectDetail(projectId);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-8 w-44 rounded-xl" />
        <Skeleton className="h-9 w-2/3" />
        <Skeleton className="h-5 w-full max-w-lg" />
        <div className="flex gap-4">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-11 w-28 rounded-md" />
          <Skeleton className="h-11 w-32 rounded-md" />
        </div>
      </div>
    );
  }

  if (!project) return null;

  const dueDateStr = project.dueDate
    ? new Date(project.dueDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
    : 'No due date';

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
        <h1 className="text-3xl font-semibold">{project.title}</h1>
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[project.status]}`}>
          {statusLabel[project.status]}
        </span>
      </div>

      <p className="text-muted-foreground text-lg">{project.description}</p>

      <div className="flex items-center gap-6 text-muted-foreground text-lg">
        <span>Due {dueDateStr}</span>
        <span>{project._count.tasks} tasks</span>
        <span>{project.projectMembers.length} members</span>
      </div>

      <div className="flex gap-3">
        <Link href={`/projects/${projectId}/create-task`}>
          <Button className="rounded-md bg-primary h-11 w-30 text-md text-accent">
            <Plus />
            Add Task
          </Button>
        </Link>

        {isAdmin && <ProjectActions projectId={projectId} />}
      </div>
    </div>
  );
}

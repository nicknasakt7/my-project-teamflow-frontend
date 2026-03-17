import Link from 'next/link';
import { TaskComments } from './task-comment';
import TaskHeader from './task-header';

import { TaskDetailProps } from '@/components/shared/types/task-type';
import { ArrowLeft } from 'lucide-react';
import { TaskStatusSelector } from './task-status-selector';

export default function TaskDetailSection({ task }: TaskDetailProps) {
  return (
    <div className="col-span-2 space-y-4">
      <Link
        href="/projects"
        className="gap-4 text-md font-semibold text-muted-foreground flex justify-start items-center pl-2 hover:bg-accent w-60 h-8 rounded-xl"
      >
        <ArrowLeft />
        Back to Projects
      </Link>
      <TaskHeader task={task} />
      <TaskStatusSelector status={task.status} />
      <TaskComments comments={task.comments} />
    </div>
  );
}

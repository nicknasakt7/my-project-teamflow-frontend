import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { TaskComments } from './task-comment';
import TaskHeader from './task-header';
import { TaskStatusSelector } from './task-status-selector';
import type { TaskDetailResponse } from '@/lib/api/task/task.type';

type TaskDetailSectionProps = { task: TaskDetailResponse; backPage?: string };

export default function TaskDetailSection({ task, backPage = '1' }: TaskDetailSectionProps) {
  return (
    <div className="col-span-2 space-y-4">
      <Link
        href={`/tasks?page=${backPage}`}
        className="gap-4 text-md font-semibold text-muted-foreground flex justify-start items-center pl-2 hover:bg-accent w-60 h-8 rounded-xl"
      >
        <ArrowLeft />
        Back to Tasks
      </Link>
      <TaskHeader task={task} />
      <TaskStatusSelector taskId={task.id} status={task.status} isPersonal={task.isPersonal} />
      <TaskComments taskId={task.id} />
    </div>
  );
}

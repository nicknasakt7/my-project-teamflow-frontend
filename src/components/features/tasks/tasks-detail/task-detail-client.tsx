'use client';

import { useSearchParams } from 'next/navigation';
import { useTaskDetail } from '@/lib/api/task/hooks/useTaskDetail';
import TaskDetailSection from './task-detail-section';
import TaskMetaSection from './task-meta-section';

type TaskDetailClientProps = { taskId: string };

export default function TaskDetailClient({ taskId }: TaskDetailClientProps) {
  const searchParams = useSearchParams();
  const backPage = searchParams.get('page') ?? '1';
  const { data: task, isLoading, isError } = useTaskDetail(taskId);

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-6 p-6">
        <p className="col-span-3 text-muted-foreground text-center py-20">Loading...</p>
      </div>
    );
  }

  if (isError || !task) {
    return (
      <div className="grid grid-cols-3 gap-6 p-6">
        <p className="col-span-3 text-destructive text-center py-20">Task not found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-6 p-6">
      <TaskDetailSection task={task} backPage={backPage} />
      <TaskMetaSection task={task} />
    </div>
  );
}

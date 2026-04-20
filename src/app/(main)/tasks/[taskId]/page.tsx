import TaskDetailClient from '@/components/features/tasks/tasks-detail/task-detail-client';

type Props = {
  params: Promise<{ taskId: string }>;
};

export default async function TaskDetailPage({ params }: Props) {
  const { taskId } = await params;
  return <TaskDetailClient taskId={taskId} />;
}

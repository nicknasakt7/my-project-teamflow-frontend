import TaskDetailClient from '@/components/features/tasks/tasks-detail/task-detail-client';

type TaskDetailPageProps = {
  params: Promise<{ projectId: string; taskId: string }>;
};

export default async function TaskDetailPage({ params }: TaskDetailPageProps) {
  const { taskId } = await params;
  return <TaskDetailClient taskId={taskId} />;
}

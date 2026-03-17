import TaskDetailSection from '@/components/features/tasks/tasks-detail/task-detail-section';
import TaskMetaSection from '@/components/features/tasks/tasks-detail/task-meta-section';
import { mockTask } from '@/components/mocks/mock-data';

export default function TaskDetailPage() {
  const task = mockTask;

  return (
    <div className="grid grid-cols-3 gap-6 p-6">
      <TaskDetailSection task={task} />
      <TaskMetaSection task={task} />
    </div>
  );
}

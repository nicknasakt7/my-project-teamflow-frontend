import TaskList from '@/components/features/projects/task-list';
import { tasks } from '@/components/mocks/mock-data';

export default function AssignedTasksPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Assigned Tasks</h1>

      <TaskList tasks={tasks} />
    </div>
  );
}

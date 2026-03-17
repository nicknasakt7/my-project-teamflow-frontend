import TaskList from '@/components/features/projects/task-list';
import { tasks } from '@/components/mocks/mock-data';
import SearchInput from '@/components/shared/search-input';
import StatusFilter from '@/components/shared/status-filter';

export default function AssignedTasksPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold ">Assigned Tasks</h1>
      <div className="flex gap-4 items-center border-2 px-8 py-4 rounded-lg">
        <SearchInput />
        <StatusFilter />
      </div>
      <div className="border-2 px-2 py-8 rounded-lg">
        <TaskList tasks={tasks} />
      </div>
    </div>
  );
}

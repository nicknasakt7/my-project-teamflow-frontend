import MyOwnTasksCard from '@/components/features/tasks/my-own-task-card';
import { myOwnTasks } from '@/components/mocks/mock-data';

export default function MyOwnTasks() {
  return (
    <div className="flex flex-col gap-4">
      {myOwnTasks.map(task => (
        <MyOwnTasksCard
          key={task.id}
          title={task.title}
          description={task.description}
          dueDate={task.dueDate}
          priority={task.priority}
          status={task.status}
        />
      ))}
    </div>
  );
}

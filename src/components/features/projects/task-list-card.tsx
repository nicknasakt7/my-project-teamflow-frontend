import { CardContent } from '@/components/ui/card';
import TaskItem from '../tasks/task-item';
import { tasks } from '@/components/mocks/mock-data';

export default function TaskList() {
  return (
    <CardContent className="flex flex-col gap-4">
      {tasks.map(task => (
        <TaskItem key={task.id} {...task} />
      ))}
    </CardContent>
  );
}

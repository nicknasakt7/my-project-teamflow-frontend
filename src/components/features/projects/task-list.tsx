import { CardContent } from '@/components/ui/card';
import TaskItem, { TaskItemProps } from '../tasks/task-item';

export type TaskListProps = {
  tasks: TaskItemProps[];
};
export default function TaskList({ tasks }: TaskListProps) {
  return (
    <CardContent className="flex flex-col gap-4 ">
      {tasks.map(task => (
        <TaskItem key={task.id} {...task} />
      ))}
    </CardContent>
  );
}

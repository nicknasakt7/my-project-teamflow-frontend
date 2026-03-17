import { TaskDetailProps } from '@/components/shared/types/task-type';
import { Card, CardContent } from '@/components/ui/card';

export function TaskDetailsCard({ task }: TaskDetailProps) {
  return (
    <Card>
      <CardContent className="p-4 space-y-1 text-lg font-semibold">
        <p>Due: {task.dueDate}</p>
        <p>Created: {task.createdAt}</p>
      </CardContent>
    </Card>
  );
}

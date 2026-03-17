import { TaskDetailProps } from '@/components/shared/types/task-type';
import { Card, CardContent } from '@/components/ui/card';

export const statusConfig = {
  TODO: { label: 'To do', className: 'bg-gray-200 text-gray-700' },
  IN_PROGRESS: { label: 'In progress', className: 'bg-blue-100 text-blue-700' },
  IN_REVIEW: { label: 'In review', className: 'bg-yellow-100 text-yellow-700' },
  DONE: { label: 'Done', className: 'bg-green-100 text-green-700' },
};

export const priorityConfig = {
  LOW: { label: 'Low', className: 'bg-gray-200 text-gray-700' },
  MEDIUM: { label: 'Medium', className: 'bg-orange-100 text-orange-700' },
  HIGH: { label: 'High', className: 'bg-red-100 text-red-700' },
};

export default function TaskHeader({ task }: TaskDetailProps) {
  const status = statusConfig[task.status];
  const priority = priorityConfig[task.priority];

  return (
    <Card>
      <CardContent className="p-5 space-y-2">
        <div className="flex gap-2">
          <span
            className={`px-2 py-1 rounded text-md font-semibold ${status.className}`}
          >
            {status.label}
          </span>

          <span
            className={`px-2 py-1 rounded text-md font-semibold ${priority.className}`}
          >
            {priority.label}
          </span>
        </div>

        <h1 className="text-2xl font-semibold">{task.title}</h1>

        <p className="text-muted-foreground text-md">{task.description}</p>
      </CardContent>
    </Card>
  );
}

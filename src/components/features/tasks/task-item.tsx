import { CalendarDays } from 'lucide-react';

export type TaskItemProps = {
  id: number;
  title: string;
  description: string;
  status: 'Todo' | 'In progress' | 'In review' | 'Done';
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  comments: number;
};

const statusStyles: Record<TaskItemProps['status'], string> = {
  Todo: 'bg-gray-100 text-gray-600',
  'In progress': 'bg-blue-100 text-blue-600',
  'In review': 'bg-yellow-100 text-yellow-700',
  Done: 'bg-green-100 text-green-600',
};
const priorityStyles: Record<TaskItemProps['priority'], string> = {
  High: 'text-red-500',
  Medium: 'text-yellow-500',
  Low: 'text-green-500',
};

export default function TaskItem({
  title,
  description,
  status,
  dueDate,
  priority,
  comments,
}: TaskItemProps) {
  return (
    <div className="flex items-start justify-between rounded-lg border p-4">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <h3 className="font-medium">{title}</h3>

          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        {/* META */}
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <CalendarDays className="size-4" />
            {dueDate}
          </div>

          <span className={priorityStyles[priority]}>• {priority}</span>

          {comments && (
            <span className="text-sm text-gray-500">💬 {comments}</span>
          )}
        </div>
      </div>

      {/* STATUS */}
      <span
        className={`rounded-full px-2 py-1 text-xs ${statusStyles[status]}`}
      >
        {status}
      </span>
    </div>
  );
}

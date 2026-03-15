import { CalendarDays, SquareCheck, Pencil, Trash2 } from 'lucide-react';

export type MyOwnTaskItemProps = {
  id: number;
  title: string;
  description: string;
  status: 'Todo' | 'In progress' | 'Done';
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
};

const statusStyles: Record<MyOwnTaskItemProps['status'], string> = {
  Todo: 'bg-gray-100 text-gray-600',
  'In progress': 'bg-blue-100 text-blue-600',
  Done: 'bg-green-100 text-green-600',
};

const priorityStyles: Record<MyOwnTaskItemProps['priority'], string> = {
  High: 'text-destructive',
  Medium: 'text-chart-1',
  Low: 'text-chart-2',
};

export default function MyOwnTaskItem({
  title,
  description,
  status,
  dueDate,
  priority,
}: MyOwnTaskItemProps) {
  return (
    <div className="flex items-start justify-between rounded-lg border border-secondary p-4">
      {/* LEFT CONTENT */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <div className="flex gap-2">
            <SquareCheck className="size-8" />
            <h3 className="font-medium text-xl">{title}</h3>
          </div>

          <p className="text-md text-muted-foreground">{description}</p>
        </div>

        {/* META */}
        <div className="flex items-center gap-3 text-md text-muted-foreground">
          <div className="flex items-center gap-1">
            <CalendarDays className="size-4" />
            {dueDate}
          </div>

          <span className={priorityStyles[priority]}>• {priority}</span>

          {/* STATUS */}
          <span
            className={`rounded-full px-2 py-1 text-xs ${statusStyles[status]}`}
          >
            {status}
          </span>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-2">
        <button className="rounded-md border p-2 hover:bg-secondary">
          <Pencil className="size-6 text-blue-500" />
        </button>

        <button className="rounded-md border p-2 hover:bg-secondary">
          <Trash2 className="size-6 text-destructive" />
        </button>
      </div>
    </div>
  );
}

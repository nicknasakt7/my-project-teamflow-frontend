import { CalendarDays } from 'lucide-react';

export type TaskItemProps = {
  id: number;
  title: string;
  description: string;
  status: 'Todo' | 'In progress' | 'In review' | 'Done';
  dueDate: string;
  priority: string;
  comments: number;
};

const statusStyles: Record<string, string> = {
  Todo: 'bg-[var(--status-todo-bg)] text-[var(--status-todo-text)]',
  'In Progress':
    'bg-[var(--status-progress-bg)] text-[var(--status-progress-text)]',
  'In Review': 'bg-[var(--status-review-bg)] text-[var(--status-review-text)]',
  Done: 'bg-[var(--status-done-bg)] text-[var(--status-done-text)]',
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

          <span
            className={priority === 'High' ? 'text-red-500' : 'text-blue-500'}
          >
            • {priority}
          </span>

          {comments > 0 && <span>{comments} comments</span>}
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

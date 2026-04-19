import { Card, CardContent } from '@/components/ui/card';
import { CalendarClock, CalendarPlus } from 'lucide-react';
import type { TaskDetailResponse } from '@/lib/api/task/task.type';

type TaskDetailsCardProps = { task: TaskDetailResponse };

export function TaskDetailsCard({ task }: TaskDetailsCardProps) {
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'DONE';

  return (
    <Card className="border-l-4 border-l-sky-400 shadow-md">
      <CardContent className="p-4 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-sky-500 dark:text-sky-400">Timeline</p>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-lg ${isOverdue ? 'bg-red-100 dark:bg-red-900/40' : 'bg-sky-100 dark:bg-sky-900/40'}`}>
              <CalendarClock className={`size-4 ${isOverdue ? 'text-red-600 dark:text-red-400' : 'text-sky-600 dark:text-sky-400'}`} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Due date</p>
              <p className={`text-sm font-semibold ${isOverdue ? 'text-red-600 dark:text-red-400' : ''}`}>
                {task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                {isOverdue && <span className="ml-1 text-xs">(Overdue)</span>}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-sky-100 dark:bg-sky-900/40">
              <CalendarPlus className="size-4 text-sky-600 dark:text-sky-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Created</p>
              <p className="text-sm font-semibold">
                {new Date(task.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

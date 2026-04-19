import { Card, CardContent } from '@/components/ui/card';
import { CheckSquare, Flame, AlertTriangle, Clock, RotateCcw, XCircle, Zap } from 'lucide-react';
import type { TaskDetailResponse } from '@/lib/api/task/task.type';

export const statusConfig = {
  TODO:        { label: 'To Do',       icon: Clock,         badge: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-200',          border: 'border-l-slate-400' },
  IN_PROGRESS: { label: 'In Progress', icon: RotateCcw,     badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300',           border: 'border-l-blue-500' },
  IN_REVIEW:   { label: 'In Review',   icon: AlertTriangle, badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300',        border: 'border-l-amber-500' },
  DONE:        { label: 'Done',        icon: CheckSquare,   badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300', border: 'border-l-emerald-500' },
  OVERDUE:     { label: 'Overdue',     icon: Flame,         badge: 'bg-red-100 text-red-700 dark:bg-red-900/60 dark:text-red-300',                border: 'border-l-red-500' },
  CANCELED:    { label: 'Canceled',    icon: XCircle,       badge: 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400',               border: 'border-l-gray-400' },
};

export const priorityConfig = {
  LOW:    { label: 'Low',    badge: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-200' },
  MEDIUM: { label: 'Medium', badge: 'bg-orange-100 text-orange-600 dark:bg-orange-900/60 dark:text-orange-300' },
  HIGH:   { label: 'High',   badge: 'bg-rose-100 text-rose-700 dark:bg-rose-900/60 dark:text-rose-300' },
  URGENT: { label: 'Urgent', badge: 'bg-red-600 text-white dark:bg-red-700' },
};

type TaskHeaderProps = { task: TaskDetailResponse };

export default function TaskHeader({ task }: TaskHeaderProps) {
  const status = statusConfig[task.status];
  const priority = priorityConfig[task.priority];
  const StatusIcon = status.icon;

  return (
    <Card className={`border-l-4 ${status.border} shadow-md`}>
      <CardContent className="p-6 space-y-3">
        <div className="flex gap-2 flex-wrap">
          <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold ${status.badge}`}>
            <StatusIcon className="size-3.5" />
            {status.label}
          </span>
          <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold ${priority.badge}`}>
            {task.priority === 'URGENT' && <Zap className="size-3.5" />}
            {priority.label}
          </span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight">{task.title}</h1>
        <p className="text-muted-foreground leading-relaxed">{task.description ?? '—'}</p>
      </CardContent>
    </Card>
  );
}

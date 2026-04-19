import { Card, CardContent } from '@/components/ui/card';
import { CalendarDays, SquareCheck } from 'lucide-react';
import Link from 'next/link';
import type { Task, TaskPriority, TaskStatus } from '@/lib/api/task/task.type';

const statusLabel: Record<TaskStatus, string> = {
  TODO: 'Todo',
  IN_PROGRESS: 'In Progress',
  IN_REVIEW: 'In Review',
  DONE: 'Done',
  OVERDUE: 'Overdue',
  CANCELED: 'Canceled',
};

const statusStyles: Record<TaskStatus, string> = {
  TODO: 'bg-muted text-accent border border-primary/70',
  IN_PROGRESS: 'bg-chart-3/80 text-accent border border-chart-2/60',
  IN_REVIEW: 'bg-chart-4/80 text-foreground border',
  DONE: 'bg-chart-2/80 text-accent border border-chart-2/60',
  OVERDUE: 'bg-destructive/20 text-destructive border border-destructive/40',
  CANCELED: 'bg-muted text-muted-foreground border',
};

const priorityLabel: Record<TaskPriority, string> = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  URGENT: 'Urgent',
};

const priorityStyles: Record<TaskPriority, string> = {
  LOW: 'text-chart-2',
  MEDIUM: 'text-chart-1',
  HIGH: 'text-destructive',
  URGENT: 'text-destructive font-bold',
};

export default function AssignedTaskCard({ id, title, description, status, dueDate, priority, project, projectId }: Task) {
  const href = projectId && project ? `/projects/${projectId}/${id}` : '#';

  return (
    <Link href={href}>
      <Card className="border-secondary hover:shadow-lg hover:-translate-y-1 transition">
        <CardContent className="flex items-start justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <div className="flex gap-2 items-center">
                <SquareCheck className="size-6 shrink-0" />
                <h3 className="font-medium text-xl">{title}</h3>
              </div>
              {description && (
                <p className="text-md text-muted-foreground line-clamp-2">{description}</p>
              )}
            </div>

            <div className="flex items-center gap-3 text-md text-muted-foreground flex-wrap">
              {dueDate && (
                <div className="flex items-center gap-1">
                  <CalendarDays className="size-4" />
                  {new Date(dueDate).toLocaleDateString()}
                </div>
              )}
              <span className={priorityStyles[priority]}>• {priorityLabel[priority]}</span>
              {project && (
                <span className="bg-primary/10 text-chart-3 font-bold px-2 py-0.5 rounded-md">
                  {project.title}
                </span>
              )}
            </div>
          </div>

          <span className={`rounded-full px-3 py-1 text-sm whitespace-nowrap ${statusStyles[status]}`}>
            {statusLabel[status]}
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}

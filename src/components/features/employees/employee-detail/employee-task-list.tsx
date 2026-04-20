'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEmployeeTasks } from '@/lib/api/task/hooks/useEmployeeTasks';
import ReassignTaskDialog from './reassign-task-dialog';

const statusColor: Record<string, string> = {
  TODO: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
  IN_PROGRESS: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  IN_REVIEW: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  DONE: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  OVERDUE: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  CANCELED: 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400',
};

const priorityColor: Record<string, string> = {
  LOW: 'bg-slate-100 text-slate-600',
  MEDIUM: 'bg-yellow-100 text-yellow-700',
  HIGH: 'bg-orange-100 text-orange-700',
  URGENT: 'bg-red-100 text-red-700',
};

const statusLabel: Record<string, string> = {
  TODO: 'Todo',
  IN_PROGRESS: 'In Progress',
  IN_REVIEW: 'In Review',
  DONE: 'Done',
  OVERDUE: 'Overdue',
  CANCELED: 'Canceled',
};

type Props = { employeeId: string };

export default function EmployeeTaskList({ employeeId }: Props) {
  const { data, isLoading } = useEmployeeTasks(employeeId);
  const tasks = data?.tasks ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          Assigned Tasks
          {data && (
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              ({data.meta.total})
            </span>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-14 rounded-lg bg-muted/40 animate-pulse" />
          ))
        ) : tasks.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">No tasks assigned</p>
        ) : (
          tasks.map(task => (
            <div
              key={task.id}
              className="flex items-center justify-between gap-3 p-3 rounded-lg border bg-card hover:bg-muted/30 transition-colors"
            >
              <div className="flex-1 min-w-0 space-y-1">
                <p className="text-sm font-medium truncate">{task.title}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor[task.status]}`}>
                    {statusLabel[task.status]}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityColor[task.priority]}`}>
                    {task.priority}
                  </span>
                  {task.project && (
                    <span className="text-xs text-muted-foreground truncate">
                      {task.project.title}
                    </span>
                  )}
                </div>
              </div>

              <ReassignTaskDialog task={task} currentEmployeeId={employeeId} />
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}

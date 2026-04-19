'use client';

import { useProjectTasks } from '@/lib/api/task/hooks/useProjectTasks';
import { CalendarDays, SquareCheck } from 'lucide-react';
import Link from 'next/link';
import type { Task, TaskStatus, TaskPriority } from '@/lib/api/task/task.type';

const statusLabel: Record<TaskStatus, string> = {
  TODO: 'Todo',
  IN_PROGRESS: 'In Progress',
  IN_REVIEW: 'In Review',
  DONE: 'Done',
  OVERDUE: 'Overdue',
  CANCELED: 'Canceled',
};

const statusStyles: Record<TaskStatus, string> = {
  TODO:        'bg-slate-100 text-slate-600 dark:bg-slate-800/60 dark:text-slate-300',
  IN_PROGRESS: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  IN_REVIEW:   'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  DONE:        'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  OVERDUE:     'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  CANCELED:    'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400',
};

const priorityStyles: Record<TaskPriority, string> = {
  LOW:    'text-slate-500 dark:text-slate-400',
  MEDIUM: 'text-orange-500 dark:text-orange-400',
  HIGH:   'text-rose-600 dark:text-rose-400',
  URGENT: 'text-red-700 font-bold dark:text-red-400',
};

function TaskCard({ task, projectId }: { task: Task; projectId: string }) {
  return (
    <Link href={`/projects/${projectId}/${task.id}`}>
      <div className="bg-card border border-border rounded-xl p-4 flex items-center justify-between hover:shadow-md hover:-translate-y-0.5 transition-all group">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <SquareCheck className="size-5 mt-0.5 shrink-0 text-muted-foreground group-hover:text-primary transition" />
          <div className="flex flex-col gap-1 min-w-0">
            <p className="font-semibold text-sm truncate">{task.title}</p>
            <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
              {task.dueDate && (
                <span className="flex items-center gap-1">
                  <CalendarDays className="size-3" />
                  {new Date(task.dueDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                </span>
              )}
              <span className={priorityStyles[task.priority]}>• {task.priority}</span>
              {task.assignTo && (
                <span>{task.assignTo.firstName} {task.assignTo.lastName}</span>
              )}
            </div>
          </div>
        </div>
        <span className={`shrink-0 ml-3 px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyles[task.status]}`}>
          {statusLabel[task.status]}
        </span>
      </div>
    </Link>
  );
}

export default function ProjectTaskList({ projectId }: { projectId: string }) {
  const { data, isLoading } = useProjectTasks(projectId);
  const tasks = data?.tasks ?? [];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-base">Tasks</p>
        <span className="text-xs text-muted-foreground">{tasks.length} total</span>
      </div>

      {isLoading ? (
        <>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-16 rounded-xl bg-muted/40 animate-pulse" />
          ))}
        </>
      ) : tasks.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-8 text-center text-sm text-muted-foreground">
          No tasks in this project
        </div>
      ) : (
        tasks.map(task => (
          <TaskCard key={task.id} task={task} projectId={projectId} />
        ))
      )}
    </div>
  );
}

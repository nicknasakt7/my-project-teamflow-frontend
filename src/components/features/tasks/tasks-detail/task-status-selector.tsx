'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useUpdateTaskStatus } from '@/lib/api/task/hooks/useUpdateTaskStatus';
import type { TaskStatus } from '@/lib/api/task/task.type';
import { Clock, RotateCcw, AlertTriangle, CheckSquare, Flame } from 'lucide-react';

const statuses: {
  value: TaskStatus;
  label: string;
  icon: React.ElementType;
  active: string;
  inactive: string;
}[] = [
  {
    value: 'TODO',
    label: 'Todo',
    icon: Clock,
    active:   'bg-slate-600 text-white shadow-sm dark:bg-slate-500',
    inactive: 'bg-slate-100 text-slate-600 border border-slate-300 hover:bg-slate-200 dark:bg-slate-800/60 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-800',
  },
  {
    value: 'IN_PROGRESS',
    label: 'In Progress',
    icon: RotateCcw,
    active:   'bg-blue-600 text-white shadow-sm dark:bg-blue-500',
    inactive: 'bg-blue-100 text-blue-700 border border-blue-300 hover:bg-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-800 dark:hover:bg-blue-900/70',
  },
  {
    value: 'IN_REVIEW',
    label: 'In Review',
    icon: AlertTriangle,
    active:   'bg-amber-500 text-white shadow-sm dark:bg-amber-600',
    inactive: 'bg-amber-100 text-amber-700 border border-amber-300 hover:bg-amber-200 dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-800 dark:hover:bg-amber-900/70',
  },
  {
    value: 'DONE',
    label: 'Done',
    icon: CheckSquare,
    active:   'bg-emerald-600 text-white shadow-sm dark:bg-emerald-500',
    inactive: 'bg-emerald-100 text-emerald-700 border border-emerald-300 hover:bg-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-800 dark:hover:bg-emerald-900/70',
  },
];

type TaskStatusSelectorProps = {
  taskId: string;
  status: TaskStatus;
  isPersonal?: boolean;
};

export function TaskStatusSelector({ taskId, status, isPersonal = false }: TaskStatusSelectorProps) {
  const [pending, setPending] = useState<TaskStatus | null>(null);
  const { mutate, isPending } = useUpdateTaskStatus(taskId);
  const { data: session } = useSession();
  const isEmployee = session?.user?.roleType === 'EMPLOYEE';
  const visibleStatuses = statuses;

  const handleConfirm = () => {
    if (!pending) return;
    mutate(pending, { onSettled: () => setPending(null) });
  };

  return (
    <>
      <Card className="shadow-md">
        <CardContent className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Update Status</p>
            {status === 'OVERDUE' && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700 dark:bg-red-900/60 dark:text-red-300">
                <Flame className="size-3" />
                Currently Overdue — select a new status
              </span>
            )}
          </div>
          <div className="flex gap-2 flex-wrap">
            {visibleStatuses.map(s => {
              const Icon = s.icon;
              const isActive = s.value === status;
              return (
                <button
                  key={s.value}
                  disabled={isActive || isPending}
                  onClick={() => {
                    if (s.value === 'DONE' && isEmployee && !isPersonal) {
                      toast.error('Only Admin can mark a task as Done');
                      return;
                    }
                    setPending(s.value);
                  }}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-150 disabled:cursor-not-allowed ${
                    isActive ? s.active : s.inactive
                  }`}
                >
                  <Icon className="size-3.5" />
                  {s.label}
                  {isActive && <span className="ml-1 text-xs opacity-70">✓</span>}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={!!pending} onOpenChange={open => !open && setPending(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Change task status to{' '}
              <span className="font-semibold text-foreground">
                {statuses.find(s => s.value === pending)?.label}
              </span>
              ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm} disabled={isPending}>
              {isPending ? 'Updating...' : 'Confirm'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

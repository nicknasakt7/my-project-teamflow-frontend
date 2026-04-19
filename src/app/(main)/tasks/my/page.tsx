'use client';

import { useState } from 'react';
import { usePersonalTasks } from '@/lib/api/task/hooks/usePersonalTasks';
import { useCreatePersonalTask } from '@/lib/api/task/hooks/useCreatePersonalTask';
import { useDeleteTask } from '@/lib/api/task/hooks/useDeleteTask';
import { useSession } from 'next-auth/react';
import { useDebounce } from '@/lib/hooks/useDebounce';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { CalendarDays, ChevronLeft, ChevronRight, Plus, Search, SquareCheck, Trash2 } from 'lucide-react';
import { useUpdateTaskStatus } from '@/lib/api/task/hooks/useUpdateTaskStatus';
import type { Task, TaskPriority, TaskStatus } from '@/lib/api/task/task.type';

const statusOptions: { label: string; value: TaskStatus | '' }[] = [
  { label: 'All', value: '' },
  { label: 'Todo', value: 'TODO' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'In Review', value: 'IN_REVIEW' },
  { label: 'Done', value: 'DONE' },
  { label: 'Overdue', value: 'OVERDUE' },
];

const statusStyles: Record<TaskStatus, string> = {
  TODO:        'bg-slate-100 text-slate-600 dark:bg-slate-800/60 dark:text-slate-300',
  IN_PROGRESS: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  IN_REVIEW:   'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  DONE:        'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  OVERDUE:     'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  CANCELED:    'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400',
};

const priorityStyles: Record<TaskPriority, string> = {
  LOW:    'text-slate-500',
  MEDIUM: 'text-orange-500',
  HIGH:   'text-rose-600',
  URGENT: 'text-red-700 font-bold',
};

const LIMIT = 10;

const statusSelectStyles: Record<TaskStatus, string> = {
  TODO:        'bg-slate-100 text-slate-600 border-slate-300 dark:bg-slate-800/60 dark:text-slate-300',
  IN_PROGRESS: 'bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900/40 dark:text-blue-300',
  IN_REVIEW:   'bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-900/40 dark:text-amber-300',
  DONE:        'bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-900/40 dark:text-emerald-300',
  OVERDUE:     'bg-red-100 text-red-700 border-red-300 dark:bg-red-900/40 dark:text-red-300',
  CANCELED:    'bg-gray-100 text-gray-500 border-gray-300 dark:bg-gray-800 dark:text-gray-400',
};

const statusLabelMap: Record<TaskStatus, string> = {
  TODO: 'Todo',
  IN_PROGRESS: 'In Progress',
  IN_REVIEW: 'In Review',
  DONE: 'Done',
  OVERDUE: 'Overdue',
  CANCELED: 'Canceled',
};

function PersonalTaskCard({ task, onDelete }: { task: Task; onDelete: (id: string) => void }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { mutate: updateStatus, isPending } = useUpdateTaskStatus(task.id);

  return (
    <>
      <div className="bg-card border border-border rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-all">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <SquareCheck className="size-5 mt-0.5 shrink-0 text-muted-foreground" />
          <div className="flex flex-col gap-1 min-w-0">
            <p className="font-semibold text-sm truncate">{task.title}</p>
            {task.description && (
              <p className="text-xs text-muted-foreground truncate">{task.description}</p>
            )}
            <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
              {task.dueDate && (
                <span className="flex items-center gap-1">
                  <CalendarDays className="size-3" />
                  {new Date(task.dueDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                </span>
              )}
              <span className={priorityStyles[task.priority]}>• {task.priority}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-3">
          <select
            value={task.status}
            disabled={isPending || task.status === 'OVERDUE'}
            onChange={e => updateStatus(e.target.value as TaskStatus)}
            className={`px-2.5 py-1 rounded-full text-xs font-semibold border transition-opacity disabled:opacity-70 ${task.status === 'OVERDUE' ? 'cursor-not-allowed' : 'cursor-pointer'} ${statusSelectStyles[task.status]}`}
          >
            {(Object.keys(statusLabelMap) as TaskStatus[])
              .filter(s => s !== 'OVERDUE')
              .map(s => (
                <option key={s} value={s}>{statusLabelMap[s]}</option>
              ))}
            {task.status === 'OVERDUE' && (
              <option value="OVERDUE">Overdue</option>
            )}
          </select>
          <button
            onClick={() => setConfirmDelete(true)}
            className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      </div>

      <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this task?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-white hover:bg-destructive/90" onClick={() => onDelete(task.id)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function CreatePersonalTaskDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { data: session } = useSession();
  const { mutate: create, isPending } = useCreatePersonalTask();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('MEDIUM');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !dueDate) return;
    create(
      {
        title: title.trim(),
        description: description.trim(),
        priority,
        status: 'TODO',
        dueDate: new Date(dueDate).toISOString(),
        isPersonal: true,
        assignToId: session?.user?.id,
      },
      {
        onSuccess: () => {
          onOpenChange(false);
          setTitle('');
          setDescription('');
          setPriority('MEDIUM');
          setDueDate('');
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Personal Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Title</label>
            <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Task title" required />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Description</label>
            <Input value={description} onChange={e => setDescription(e.target.value)} placeholder="Optional description" />
          </div>
          <div className="flex gap-3">
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-sm font-medium">Priority</label>
              <select
                value={priority}
                onChange={e => setPriority(e.target.value as TaskPriority)}
                className="border border-input bg-background rounded-md px-3 py-2 text-sm"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="URGENT">Urgent</option>
              </select>
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-sm font-medium">Due Date</label>
              <Input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} required />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending || !title.trim() || !dueDate}>
              {isPending ? 'Creating...' : 'Create Task'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function MyOwnTasks() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<TaskStatus | ''>('');
  const debouncedSearch = useDebounce(search, 400);
  const { mutate: deleteTask } = useDeleteTask();

  const { data, isLoading } = usePersonalTasks({
    page,
    limit: LIMIT,
    search: debouncedSearch || undefined,
    status: status || undefined,
  });

  const tasks = data?.tasks ?? [];
  const total = data?.meta.total ?? 0;
  const totalPages = data?.meta.totalPages ?? 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-semibold">My Tasks</h1>
          <p className="text-xl text-muted-foreground mt-1">Personal tasks you created</p>
        </div>
        <Button onClick={() => setOpen(true)} className="h-11 gap-2">
          <Plus className="size-4" />
          New Task
        </Button>
      </div>

      <CreatePersonalTaskDialog open={open} onOpenChange={setOpen} />

      {/* Filters */}
      <div className="flex gap-4 items-center bg-card/80 border px-6 py-4 rounded-lg flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            className="pl-9"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {statusOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => { setStatus(opt.value as TaskStatus | ''); setPage(1); }}
              className={`px-3 py-1 rounded-full text-sm border transition ${
                status === opt.value
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-muted-foreground/30 hover:border-primary'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Showing <span className="font-medium text-foreground">{tasks.length}</span> of{' '}
        <span className="font-medium text-foreground">{total}</span> tasks
      </p>

      <div className="flex flex-col gap-3 min-h-40">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-16 rounded-xl bg-muted/40 animate-pulse" />
          ))
        ) : tasks.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-10 text-center text-sm text-muted-foreground">
            No personal tasks yet
          </div>
        ) : (
          tasks.map(task => (
            <PersonalTaskCard
              key={task.id}
              task={task}
              onDelete={(id) => deleteTask(id)}
            />
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-end gap-3">
          <Button variant="outline" size="icon" onClick={() => setPage(p => p - 1)} disabled={page === 1}>
            <ChevronLeft className="size-4" />
          </Button>
          <span className="text-sm">Page {page} / {totalPages}</span>
          <Button variant="outline" size="icon" onClick={() => setPage(p => p + 1)} disabled={page === totalPages}>
            <ChevronRight className="size-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

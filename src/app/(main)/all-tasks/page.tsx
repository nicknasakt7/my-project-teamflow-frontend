'use client';

import { useState } from 'react';
import { useAdminTasks } from '@/lib/api/task/hooks/useAdminTasks';
import AssignedTaskCard from '@/components/features/tasks/assigned-task-card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { TaskStatus } from '@/lib/api/task/task.type';
import SearchInput from '@/components/shared/search-input';
import { useDebounce } from '@/lib/hooks/useDebounce';

const statusOptions: { label: string; value: TaskStatus | '' }[] = [
  { label: 'All', value: '' },
  { label: 'Todo', value: 'TODO' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'In Review', value: 'IN_REVIEW' },
  { label: 'Done', value: 'DONE' },
  { label: 'Overdue', value: 'OVERDUE' },
];

const LIMIT = 10;

export default function AdminAllTasksPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<TaskStatus | ''>('');
  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading } = useAdminTasks({
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
      <div className="flex gap-4 items-center bg-card/80 border px-8 py-4 rounded-lg flex-wrap">
        <SearchInput onChange={val => { setSearch(val); setPage(1); }} />
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

      <div className="border-2 px-4 py-6 rounded-lg flex flex-col gap-4 min-h-40">
        {isLoading ? (
          <p className="text-muted-foreground text-center py-10">Loading...</p>
        ) : tasks.length === 0 ? (
          <p className="text-muted-foreground text-center py-10">No tasks found</p>
        ) : (
          tasks.map(task => <AssignedTaskCard key={task.id} {...task} />)
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

import { Skeleton } from '@/components/ui/skeleton';

export default function MyTasksLoading() {
  return (
    <div className="flex flex-col gap-4 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-9 w-32" />
          <Skeleton className="h-5 w-48" />
        </div>
        <Skeleton className="h-10 w-28 rounded-full" />
      </div>

      {/* Filter bar */}
      <div className="flex gap-4 items-center bg-card border px-6 py-4 rounded-lg flex-wrap">
        <Skeleton className="h-10 flex-1 min-w-48 rounded-md" />
        <div className="flex gap-2 flex-wrap">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-20 rounded-full" />
          ))}
        </div>
      </div>

      {/* Count */}
      <Skeleton className="h-4 w-32" />

      {/* Task list */}
      <div className="flex flex-col gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-start gap-3 flex-1">
              <Skeleton className="size-5 rounded shrink-0 mt-0.5" />
              <div className="flex flex-col gap-2 flex-1">
                <Skeleton className="h-4 w-2/3" />
                <div className="flex gap-3">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Skeleton className="h-7 w-24 rounded-full" />
              <Skeleton className="size-7 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

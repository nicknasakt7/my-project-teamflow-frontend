import { Skeleton } from '@/components/ui/skeleton';

export default function EmployeesLoading() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-9 w-44" />
          <Skeleton className="h-5 w-64" />
        </div>
        <Skeleton className="h-10 w-36 rounded-full" />
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap gap-3 items-center bg-card/80 border px-6 py-4 rounded-lg">
        <Skeleton className="h-9 flex-1 min-w-48 rounded-md" />
        <Skeleton className="h-9 w-40 rounded-md" />
        <Skeleton className="h-9 w-40 rounded-md" />
        <Skeleton className="h-9 w-36 rounded-md" />
        <Skeleton className="h-9 w-52 rounded-md" />
      </div>

      <Skeleton className="h-4 w-40" />

      {/* Member grid */}
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-card border rounded-xl p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
              </div>
              <Skeleton className="h-5 w-14 rounded-full shrink-0" />
            </div>
            <Skeleton className="h-3.5 w-full" />
            <div className="border-t pt-3 flex justify-between">
              <div className="flex-1 flex flex-col items-center gap-1">
                <Skeleton className="h-5 w-10" />
                <Skeleton className="h-3 w-8" />
              </div>
              <div className="w-px bg-border" />
              <div className="flex-1 flex flex-col items-center gap-1">
                <Skeleton className="h-5 w-14" />
                <Skeleton className="h-3 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TasksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <div className="space-y-6 mt-6 ml-6">
      <h1 className="text-4xl font-semibold">All Tasks</h1>
      <p className="text-xl text-muted-foreground">
        Manage your assigned tasks and personal tasks
      </p>

      <div className="grid grid-cols-2 gap-4">
        <Link
          href="/tasks"
          className={cn(
            'flex items-center justify-center rounded-xl py-4 text-xl font-semibold transition text-center',
            pathname === '/tasks'
              ? 'bg-primary text-card shadow-sm'
              : 'bg-card border-4 border-border hover:bg-accent',
          )}
        >
          Assigned Tasks
        </Link>

        <Link
          href="/tasks/my"
          className={cn(
            'flex items-center justify-center rounded-xl py-4 text-xl font-semibold transition text-center',
            pathname === '/tasks/my'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'bg-card border-4 border-border hover:bg-accent',
          )}
        >
          My Own Tasks
        </Link>
      </div>

      <div>{children}</div>
    </div>
  );
}

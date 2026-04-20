'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function AdminTasksLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'loading') return;
    const role = session?.user?.roleType;
    if (role === 'EMPLOYEE') router.replace('/tasks');
  }, [session, status, router]);

  return (
    <div className="space-y-6 mt-6 ml-6">
      <div>
        <h1 className="text-4xl font-semibold">All Tasks</h1>
        <p className="text-xl text-muted-foreground mt-1">Tasks you created and your personal tasks</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Link
          href="/all-tasks"
          className={cn(
            'flex items-center justify-center rounded-xl py-4 text-xl font-semibold transition text-center',
            pathname === '/all-tasks'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'bg-card border-4 border-border hover:bg-accent',
          )}
        >
          All Tasks
        </Link>

        <Link
          href="/all-tasks/my"
          className={cn(
            'flex items-center justify-center rounded-xl py-4 text-xl font-semibold transition text-center',
            pathname === '/all-tasks/my'
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

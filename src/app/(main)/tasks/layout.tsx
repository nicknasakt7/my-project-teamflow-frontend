import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function TasksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Tasks</h1>
      {/* 
      <Button className="flex gap-4 w-40 text-lg" asChild>
        <Link href="/tasks/create">
          <Plus />
          Create Task
        </Link>
      </Button> */}
      <div className="grid grid-cols-2 gap-6 justify-center items-center">
        <button className="bg-chart-1 text-xl text-card font-bold px-4 py-2 rounded-lg">
          <Link href="/tasks">Assigned</Link>
        </button>
        <button className="bg-chart-2 text-xl text-card font-bold px-4 py-2 rounded-lg ">
          <Link href="/tasks/my">My Tasks</Link>
        </button>
      </div>

      <div>{children}</div>
    </div>
  );
}

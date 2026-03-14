import Link from 'next/link';

export default function TasksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-semibold">All Tasks</h1>

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

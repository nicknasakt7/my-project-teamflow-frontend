import CreateTaskForm from '@/components/features/tasks/task-form';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CreateTask() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-start ml-80 items-center gap-3 mb-6">
        <Link
          href="/projects"
          className="gap-4 text-md font-semibold text-muted-foreground flex  items-center p-2 hover:bg-accent h-8 rounded-xl"
        >
          <ArrowLeft />
          Adding task to E-Commerce Platform Redesign
        </Link>
      </div>
      <div>
        <CreateTaskForm />
      </div>
    </div>
  );
}

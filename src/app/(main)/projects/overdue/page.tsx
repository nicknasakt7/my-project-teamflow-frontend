import ProjectList from '@/components/features/projects/project-list';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Overdue Projects' };

export default function OverdueProjectsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="size-5" />
        </Link>
        <div className="flex flex-col space-y-1">
          <div className="flex items-center gap-2">
            <AlertTriangle className="size-5 text-red-500" />
            <h1 className="text-4xl font-semibold">Overdue Projects</h1>
          </div>
          <p className="text-xl text-muted-foreground">Projects that have passed their deadline</p>
        </div>
      </div>

      <ProjectList status="OVERDUE" />
    </div>
  );
}

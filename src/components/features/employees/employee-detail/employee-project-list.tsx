'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import type { EmployeeSummary } from '@/lib/api/employee/hooks/useEmployeeSummary';

type Props = { projects: EmployeeSummary['projects'] };

const statusStyles: Record<string, string> = {
  ACTIVE: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  COMPLETED: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  CANCELED: 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400',
  ON_HOLD: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
};

const statusLabel: Record<string, string> = {
  ACTIVE: 'Active',
  COMPLETED: 'Completed',
  CANCELED: 'Canceled',
  ON_HOLD: 'On Hold',
};

export default function EmployeeProjectList({ projects }: Props) {
  if (projects.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg mb-4">Active Projects</h3>
          <p className="text-sm text-muted-foreground text-center py-6">No projects assigned</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <h3 className="font-semibold text-lg">Projects ({projects.length})</h3>

        <div className="space-y-3">
          {projects.map(project => {
            const progress = project.totalTasks > 0
              ? Math.round((project.doneTasks / project.totalTasks) * 100)
              : 0;

            return (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <div className="p-4 border border-border rounded-lg space-y-2 hover:bg-accent/50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium truncate">{project.title}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 font-medium ${statusStyles[project.status] ?? 'bg-muted text-muted-foreground'}`}>
                      {statusLabel[project.status] ?? project.status}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{project.doneTasks} / {project.totalTasks} tasks done</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-1.5 bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

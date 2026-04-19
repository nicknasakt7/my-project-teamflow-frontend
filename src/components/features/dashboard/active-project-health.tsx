'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProjectHealthItem } from './project-health-item';
import Link from 'next/link';
import { useProjectProgress } from '@/lib/api/dashboard/hooks/useProjectProgress';

export default function ActiveProjectHealth() {
  const { data, isLoading } = useProjectProgress();
  const projects = data?.data ?? [];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Active Project Health</CardTitle>
        <Link
          href="/projects"
          className="text-md text-muted-foreground cursor-pointer hover:bg-secondary hover:text-primary font-medium px-4 rounded-xl"
        >
          View all
        </Link>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {isLoading ? (
          <p className="text-muted-foreground text-sm py-4 text-center">Loading...</p>
        ) : projects.length === 0 ? (
          <p className="text-muted-foreground text-sm py-4 text-center">No active projects</p>
        ) : (
          projects.map(project => (
            <Link
              key={project.projectId}
              href={`/projects/${project.projectId}`}
              className="block hover:opacity-80 transition hover:text-chart-3"
            >
              <ProjectHealthItem {...project} />
            </Link>
          ))
        )}
      </CardContent>
    </Card>
  );
}

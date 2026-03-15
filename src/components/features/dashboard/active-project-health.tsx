import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { ProjectHealthItem } from './project-health-item';
import Link from 'next/link';

const projects = [
  {
    id: '1',
    name: 'E-Commerce Platform Redesign',
    dueDate: 'Apr 30, 2026',
    completed: 3,
    total: 5,
    status: 'Active' as const,
  },
  {
    id: '2',
    name: 'Mobile Banking App',
    dueDate: 'Feb 15, 2026',
    completed: 2,
    total: 5,
    status: 'Overdue' as const,
  },
  {
    id: '3',
    name: 'Customer Portal',
    dueDate: 'May 10, 2026',
    completed: 4,
    total: 6,
    status: 'Active' as const,
  },
];

export default function ActiveProjectHealth() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Active Project Health</CardTitle>

        <span className="text-md text-muted-foreground cursor-pointer hover:bg-secondary hover:text-primary font-medium px-4 rounded-xl">
          View all
        </span>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {projects.map(project => (
          <Link
            key={project.id}
            href={`/projects/${project.id}`}
            className="block hover:opacity-80 transition hover:text-chart-3"
          >
            <ProjectHealthItem {...project} />
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}

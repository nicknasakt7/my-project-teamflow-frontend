import TeamMembers from '@/components/features/employees/team-member';

import ProjectHeader from '@/components/features/projects/project-header';
import ProjectProgress from '@/components/features/projects/project-progress-bar';
import TaskList from '@/components/features/projects/task-list';
import { tasks } from '@/components/mocks/mock-data';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function ProjectDetailPage({}: PageProps<'/projects/[projectId]'>) {
  return (
    <div className="flex flex-col gap-6 p-6">
      <ProjectHeader />

      <ProjectProgress />

      <Card className="grid grid-cols-3 gap-6">
        <CardContent className="col-span-2 ">
          <Link href="/projects/:projectId/:tasksId ">
            <TaskList tasks={tasks} />
          </Link>
        </CardContent>

        <CardContent>
          <TeamMembers />
        </CardContent>
      </Card>
    </div>
  );
}

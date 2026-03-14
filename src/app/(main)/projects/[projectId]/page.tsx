import TeamMembers from '@/components/features/employees/team-member';

import ProjectHeader from '@/components/features/projects/project-header';
import ProjectProgress from '@/components/features/projects/project-progress-bar';
import TaskList from '@/components/features/projects/task-list';
import { tasks } from '@/components/mocks/mock-data';

export default function ProjectDetailPage({}: PageProps<'/projects/[projectId]'>) {
  return (
    <div className="flex flex-col gap-6 p-6">
      <ProjectHeader />

      <ProjectProgress />

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <TaskList tasks={tasks} />
        </div>

        <div>
          <TeamMembers />
        </div>
      </div>
    </div>
  );
}

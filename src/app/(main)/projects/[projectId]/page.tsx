import TeamMembers from '@/components/features/employees/team-member';
import ProjectHeader from '@/components/features/projects/project-header';
import ProjectProgress from '@/components/features/projects/project-progress-bar';
import ProjectTaskList from '@/components/features/projects/project-task-list';
import ProjectCreatorCard from '@/components/features/projects/project-creator-card';
import { notFound } from 'next/navigation';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;

  if (!UUID_REGEX.test(projectId)) notFound();

  return (
    <div className="flex flex-col gap-6 p-6">
      <ProjectHeader projectId={projectId} />

      <ProjectProgress projectId={projectId} />

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <ProjectTaskList projectId={projectId} />
        </div>

        <div className="flex flex-col gap-6">
          <TeamMembers projectId={projectId} />
          <ProjectCreatorCard projectId={projectId} />
        </div>
      </div>
    </div>
  );
}

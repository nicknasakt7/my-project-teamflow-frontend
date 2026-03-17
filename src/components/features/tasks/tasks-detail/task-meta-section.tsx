import { TaskDetailProps } from '@/components/shared/types/task-type';
import { ProjectCard } from './project-card';
import { TaskDetailsCard } from './task-detail-card';
import { UserCard } from './user-card';

export default function TaskMetaSection({ task }: TaskDetailProps) {
  return (
    <div className="space-y-4 mt-12">
      <UserCard title="Assigned to" user={task.assignee} />
      <UserCard title="Created by" user={task.creator} />
      <TaskDetailsCard task={task} />
      <ProjectCard name={task.projectName} />
    </div>
  );
}

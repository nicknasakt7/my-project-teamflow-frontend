import { ProjectCard } from './project-card';
import { TaskDetailsCard } from './task-detail-card';
import { UserCard } from './user-card';
import type { TaskDetailResponse } from '@/lib/api/task/task.type';

type TaskMetaSectionProps = { task: TaskDetailResponse };

export default function TaskMetaSection({ task }: TaskMetaSectionProps) {
  return (
    <div className="space-y-4 mt-12">
      <UserCard title="Assigned to" user={task.assignTo} />
      <UserCard title="Created by" user={task.createdBy} />
      <TaskDetailsCard task={task} />
      <ProjectCard project={task.project} />
    </div>
  );
}

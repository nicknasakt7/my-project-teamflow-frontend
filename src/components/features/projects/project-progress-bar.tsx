'use client';

import { Progress } from '@/components/ui/progress';
import { useProjectTasks } from '@/lib/api/task/hooks/useProjectTasks';

export default function ProjectProgress({ projectId }: { projectId: string }) {
  const { data } = useProjectTasks(projectId);
  const tasks = data?.tasks ?? [];

  const total = tasks.length;
  const done = tasks.filter((t) => t.status === 'DONE').length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between text-md">
        <span>Overall Progress</span>
        <span>{percent}%</span>
      </div>
      <Progress value={percent} />
      <p className="text-xs text-muted-foreground">{done} of {total} tasks completed</p>
    </div>
  );
}

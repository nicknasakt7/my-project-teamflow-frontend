import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import type { ProjectHealth } from '@/lib/api/dashboard/dashboard.type';

const statusConfig: Record<ProjectHealth['status'], { label: string; className: string }> = {
  ON_TRACK: { label: 'On Track', className: 'bg-green-100 text-green-700 hover:bg-green-100' },
  DELAYED:  { label: 'Delayed',  className: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100' },
  OVERDUE:  { label: 'Overdue',  className: 'bg-red-100 text-red-700 hover:bg-red-100' },
};

export function ProjectHealthItem({ projectTitle, dueDate, completedTask, totalTask, progressPercent, status }: ProjectHealth) {
  const { label, className } = statusConfig[status];
  const formattedDate = dueDate
    ? new Date(dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : 'No deadline';

  return (
    <div className="flex flex-col gap-2 rounded-lg border p-4 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium text-lg">{projectTitle}</p>
          <p className="text-sm text-muted-foreground">Due {formattedDate}</p>
        </div>
        <Badge className={className}>{label}</Badge>
      </div>
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{completedTask} / {totalTask} Tasks to complete</span>
        <span>{progressPercent}%</span>
      </div>
      <Progress value={progressPercent} />
    </div>
  );
}

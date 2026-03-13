import { Progress } from '@/components/ui/progress';
import { Badge } from 'lucide-react';

type ProjectHealthItemProps = {
  name: string;
  dueDate: string;
  completed: number;
  total: number;
  status: 'on-track' | 'at-risk' | 'overdue';
};

export function ProjectHealthItem({
  name,
  dueDate,
  completed,
  total,
  status,
}: ProjectHealthItemProps) {
  const percent = Math.round((completed / total) * 100);

  const statusMap = {
    'on-track': (
      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
        On Track
      </Badge>
    ),
    'at-risk': (
      <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
        At Risk
      </Badge>
    ),
    overdue: (
      <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
        Overdue
      </Badge>
    ),
  };

  return (
    <div className="flex flex-col gap-2 rounded-lg border p-4 hover:shadow-lg hover:cursor-pointer transition-all duration-200 hover:-translate-y-0.5">
      <div className="flex items-center justify-between ">
        <div>
          <p className="font-medium text-lg">{name}</p>
          <p className="text-sm text-muted-foreground">Due {dueDate}</p>
        </div>

        {statusMap[status]}
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          {completed} / {total} Completed
        </span>

        <span>{percent}%</span>
      </div>

      <Progress value={percent} />
    </div>
  );
}

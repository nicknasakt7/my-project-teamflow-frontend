import { Card, CardContent } from '@/components/ui/card';
import { CalendarDays, MessageCircleMore, SquareCheck } from 'lucide-react';
import Link from 'next/link';

export type TaskItemProps = {
  id: number;
  title: string;
  description: string;
  status: 'Todo' | 'In progress' | 'In review' | 'Done';
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  comments: number;
  project: {
    id: number;
    title: string;
  };
};

const statusStyles: Record<TaskItemProps['status'], string> = {
  Todo: 'bg-muted text-accent border border-primary/70',
  'In progress': 'bg-chart-3/80 text-accent border border-chart-2/60',
  'In review': 'bg-chart-4/80 text-foreground border',
  Done: 'bg-chart-2/80 text-accent border border-chart-2/60',
};
const priorityStyles: Record<TaskItemProps['priority'], string> = {
  High: 'text-destructive',
  Medium: 'text-chart-1',
  Low: 'text-chart-2',
};

export default function TaskItem({
  id,
  title,
  description,
  status,
  dueDate,
  priority,
  comments,
  project,
}: TaskItemProps) {
  return (
    <Link href={`/projects/${project.id}/${id}`}>
      <Card className="border-secondary hover:shadow-lg hover:-translate-y-1 transition">
        <CardContent className="flex items-start justify-between">
          {/* LEFT */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <div className="flex gap-2">
                <SquareCheck className="size-8" />
                <h3 className="font-medium text-xl">{title}</h3>
              </div>

              <p className="text-md text-muted-foreground">{description}</p>
            </div>

            {/* META */}
            <div className="flex items-center gap-3 text-md text-muted-foreground">
              <div className="flex items-center gap-1">
                <CalendarDays className="size-4" />
                {dueDate}
              </div>

              <span className={priorityStyles[priority]}>• {priority}</span>

              {comments && (
                <span className="flex gap-1 text-md text-foreground">
                  <MessageCircleMore className="size-4" />
                  {comments}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-md text-muted-foreground">
              <span>Project:</span>
              {/* <Link href={`/projects/${project.id}`}> */}
              <span className="bg-primary/10 text-chart-3 font-bold px-2 py-0.5 rounded-md">
                {project.title}
              </span>
              {/* </Link> */}
            </div>
          </div>

          {/* RIGHT */}
          <span
            className={`rounded-full px-2 py-1 text-md ${statusStyles[status]}`}
          >
            {status}
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}

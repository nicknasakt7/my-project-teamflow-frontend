import { Progress } from '@/components/ui/progress';
import Link from 'next/link';

export type ProjectCardProps = {
  id: number;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'canceled';
  progress: number;
  tasks: number;
  dueDate: string;
  members: number;
};

const statusColor = {
  active: 'bg-green-500',
  completed: 'bg-blue-500',
  canceled: 'bg-red-500',
};

export default function ProjectCard({
  id,
  name,
  description,
  status,
  progress,
  tasks,
  dueDate,
  members,
}: ProjectCardProps) {
  return (
    <Link href={`/projects/${id}`}>
      <div
        className="
      border
      rounded-xl
      p-5
      flex flex-col gap-3
      transition-all duration-200
      hover:-translate-y-1
      hover:shadow-md
      cursor-pointer
      "
      >
        <h3 className="font-semibold text-xl">{name}</h3>

        <p className="text-md font-medium text-muted-foreground">
          {description}
        </p>

        {/* status */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className={`size-2 rounded-full ${statusColor[status]}`}></span>
          {status}
        </div>

        {/* progress */}
        <Progress value={progress} />

        <div className="text-sm text-muted-foreground">{tasks} tasks</div>
        <div className="text-sm text-muted-foreground">Due: {dueDate}</div>
        <div className="text-sm text-muted-foreground">
          Team Members: {members}
        </div>
      </div>
    </Link>
  );
}

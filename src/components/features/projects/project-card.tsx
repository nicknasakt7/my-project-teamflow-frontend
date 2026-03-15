import { Progress } from '@/components/ui/progress';
import { CalendarClock, ClipboardList, Users } from 'lucide-react';
import Link from 'next/link';

export type ProjectCardProps = {
  id: number;
  title: string;
  description: string;
  status: 'Active' | 'Completed' | 'Canceled';
  progress: number;
  tasks: number;
  dueDate: string;
  users: {
    id: number;
    profileImageUrl: string;
  }[];
};
const statusColor = {
  Active: 'bg-chart-2',
  Completed: 'bg-chart-3/80',
  Canceled: 'bg-destructive',
};

export default function ProjectCard({
  id,
  title,
  description,
  status,
  progress,
  tasks,
  dueDate,
  users,
}: ProjectCardProps) {
  return (
    <Link href={`/projects/${id}`}>
      <div className="h-80 border rounded-xl p-5 flex flex-col gap-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-md cursor-pointer">
        <h3 className="font-semibold text-xl line-clamp-1">{title}</h3>

        <p className="text-md font-medium text-muted-foreground line-clamp-2">
          {description}
        </p>

        {/* status */}
        <div className="flex items-center gap-2 text-md text-muted-foreground">
          <span className={`size-2 rounded-full ${statusColor[status]}`} />
          {status}
        </div>

        {/* progress */}
        <Progress value={progress} indicatorClassname={statusColor[status]} />

        <div className="flex gap-2 text-md text-muted-foreground">
          <ClipboardList />
          {tasks} tasks
        </div>
        <div className="flex gap-2 text-md text-muted-foreground">
          <CalendarClock />
          Due: {dueDate}
        </div>
        <div className="flex gap-2 text-md text-muted-foreground">
          <Users />
          Team Members: {users.length}
        </div>
        <div className="flex -space-x-3 mt-2">
          {users.slice(0, 5).map(user => (
            <Avatar key={user.id} className="size-9 border-2 border-background">
              <AvatarImage src={user.profileImageUrl} />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          ))}

          {users.length > 5 && (
            <div className="size-9 rounded-full bg-muted flex items-center justify-center text-xs border-2 border-background">
              +{users.length - 5}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

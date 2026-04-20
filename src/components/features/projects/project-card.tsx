import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CalendarClock, ClipboardList, Timer, Users } from 'lucide-react';
import Link from 'next/link';
import type { Project } from '@/lib/api/project/project.type';

function getDaysRemaining(dueDate: string | null): string {
  if (!dueDate) return 'No deadline';
  const diff = Math.ceil((new Date(dueDate).getTime() - Date.now()) / 86400000);
  if (diff < 0) return `${Math.abs(diff)} days overdue`;
  if (diff === 0) return 'Due today';
  return `${diff} days remaining`;
}

const statusColor: Record<string, string> = {
  ACTIVE: 'bg-chart-2',
  COMPLETED: 'bg-chart-3/80',
  OVERDUE: 'bg-chart-1',
  CANCELED: 'bg-destructive',
};

const statusLabel: Record<string, string> = {
  ACTIVE: 'Active',
  COMPLETED: 'Completed',
  OVERDUE: 'Overdue',
  CANCELED: 'Canceled',
};

export default function ProjectCard({ id, title, description, status, dueDate, projectMembers, _count, page = 1 }: Project & { page?: number }) {
  const formattedDate = dueDate
    ? new Date(dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : 'No deadline';

  return (
    <Link href={`/projects/${id}?page=${page}`} className="h-full">
      <div className="h-full bg-card border rounded-xl p-5 flex flex-col gap-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-md cursor-pointer shadow-md">
        <h3 className="font-semibold text-xl line-clamp-1">{title}</h3>

        <p className="text-md font-medium text-muted-foreground line-clamp-2">
          {description}
        </p>

        <div className="flex items-center gap-2 text-md text-muted-foreground">
          <span className={`size-2 rounded-full ${statusColor[status]}`} />
          {statusLabel[status]}
        </div>

        <Progress value={status === 'COMPLETED' ? 100 : status === 'CANCELED' ? 0 : undefined} />

        <div className="flex gap-2 text-md text-muted-foreground">
          <ClipboardList />
          {_count.tasks} tasks
        </div>
        <div className="flex gap-2 text-md text-muted-foreground">
          <CalendarClock />
          Due: {formattedDate}
        </div>
        <div className="flex gap-2 text-md text-muted-foreground">
          <Timer />
          {getDaysRemaining(dueDate)}
        </div>
        <div className="flex items-center gap-2 text-md text-muted-foreground">
          <Users className="shrink-0" />
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {projectMembers.slice(0, 4).map((m) => {
                const initials = `${m.user.firstName[0] ?? ''}${m.user.lastName[0] ?? ''}`.toUpperCase();
                return (
                  <Avatar key={m.userId} className="size-7 ring-2 ring-background">
                    <AvatarImage src={m.user.profileImageUrl ?? undefined} alt={`${m.user.firstName} ${m.user.lastName}`} />
                    <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-bold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                );
              })}
              {projectMembers.length > 4 && (
                <div className="size-7 rounded-full ring-2 ring-background bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground">
                  +{projectMembers.length - 4}
                </div>
              )}
            </div>
            <span>{projectMembers.length} members</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

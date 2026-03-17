import { Mail } from 'lucide-react';
import Link from 'next/link';

export type MemberCardProps = {
  id: number;
  name: string;
  position: string;
  email: string;
  projects: number;
  tasks: number;
  status: 'Active' | 'In active' | 'On Leave';
};

const statusStyles = {
  Active: 'bg-chart-2 text-card',
  'In active': 'bg-accent-foreground text-accent',
  'On Leave': ' bg-muted text-card',
};
const getInitials = (name: string) => {
  const parts = name.split(' ');
  return parts[0][0] + parts[1][0];
};

export default function MemberCard({
  id,
  name,
  position,
  email,
  projects,
  tasks,
  status,
}: MemberCardProps) {
  return (
    <Link href={`/employees/${id}`}>
      <div className="border rounded-xl p-5 flex flex-col gap-4 bg-sidebar-accent shadow-md hover:text-chart-3/80">
        <div className="flex justify-between items-start gap-2">
          <div className="flex items-center gap-3 flex-1 min-w-0 l">
            <div className="w-10 h-10 rounded-full bg-chart-3 flex items-center justify-center text-white font-semibold shrink-0">
              {getInitials(name)}
            </div>

            <div className="min-w-0">
              <h3 className="font-semibold truncate">{name}</h3>
              <p className="text-sm text-muted-foreground truncate">
                {position}
              </p>
            </div>
          </div>

          <span
            className={`text-xs px-2 py-1 rounded-full text-center ${statusStyles[status]}`}
          >
            {status}
          </span>
        </div>

        <p className="flex gap-2 text-sm text-muted-foreground truncate">
          <Mail />
          {email}
        </p>

        <div className="border-t pt-3 flex justify-between text-center">
          <div className="flex-1">
            <p className="font-semibold">{projects}</p>
            <p className="text-xs text-muted-foreground">Projects</p>
          </div>

          <div className="w-px bg-border" />

          <div className="flex-1">
            <p className="font-semibold">{tasks}</p>
            <p className="text-xs text-muted-foreground">Tasks</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

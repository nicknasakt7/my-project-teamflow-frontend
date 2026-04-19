import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { UserCircle2 } from 'lucide-react';

type User = { firstName: string; lastName: string };

type UserCardProps = {
  title: string;
  user?: User | null;
};

export function UserCard({ title, user }: UserCardProps) {
  if (!user) return null;
  const fullName = `${user.firstName} ${user.lastName}`;
  const initials = `${user.firstName[0]}${user.lastName[0]}`;

  return (
    <Card className="border-l-4 border-l-violet-400 shadow-md">
      <CardContent className="p-4">
        <div className="flex items-center gap-1.5 mb-3">
          <UserCircle2 className="size-4 text-violet-500 dark:text-violet-400" />
          <p className="text-xs font-semibold uppercase tracking-wider text-violet-500 dark:text-violet-400">{title}</p>
        </div>
        <div className="flex items-center gap-3">
          <Avatar className="size-10 ring-2 ring-violet-200 dark:ring-violet-800">
            <AvatarFallback className="bg-violet-500 text-white font-bold text-sm dark:bg-violet-600">
              {initials}
            </AvatarFallback>
          </Avatar>
          <p className="font-semibold text-base">{fullName}</p>
        </div>
      </CardContent>
    </Card>
  );
}

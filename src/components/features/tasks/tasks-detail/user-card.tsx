import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { TaskDetail } from '@/components/shared/types/task-detail-type';
type UserCardProps = {
  title: TaskDetail['title'];
  user: TaskDetail['creator'];
};
export function UserCard({ title, user }: UserCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-lg font-semibold text-primary">{title}</p>

        <div className="flex gap-2 mt-2">
          <Avatar>
            <AvatarFallback className="bg-primary text-card">
              {user.name.slice(0, 2)}
            </AvatarFallback>
          </Avatar>

          <div>
            <p className="text-md font-medium">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

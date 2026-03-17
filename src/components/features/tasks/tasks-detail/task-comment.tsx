import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TaskDetail } from '@/components/shared/types/task-detail-type';

type TaskCommentsProps = {
  comments: TaskDetail['comments'];
};
export function TaskComments({ comments }: TaskCommentsProps) {
  return (
    <Card>
      <CardContent className="p-5 space-y-4">
        <p className="font-medium">Comments ({comments.length})</p>

        {comments.map(c => (
          <div key={c.id} className="flex gap-3">
            <Avatar>
              <AvatarFallback>{c.name.slice(0, 2)}</AvatarFallback>
            </Avatar>

            <div>
              <p className="text-sm font-medium">{c.name}</p>
              <p className="text-sm text-muted-foreground">{c.message}</p>
            </div>
          </div>
        ))}

        <div className="flex gap-2">
          <Input placeholder="Write a comment..." />
          <Button>Send</Button>
        </div>
      </CardContent>
    </Card>
  );
}

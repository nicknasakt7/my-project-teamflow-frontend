import { TaskDetail } from '@/components/shared/types/task-detail-type';
import { Card, CardContent } from '@/components/ui/card';

type TaskCommentsProps = {
  name: TaskDetail['projectName'];
};
export function ProjectCard({ name }: TaskCommentsProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-lg font-semibold text-muted-foreground">Project</p>
        <p className="text-lg font-medium">{name}</p>
      </CardContent>
    </Card>
  );
}

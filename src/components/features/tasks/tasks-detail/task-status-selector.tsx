import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TaskDetail } from '@/components/shared/types/task-detail-type';

const statuses = ['TODO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'];

type TaskStatusSelectorProps = {
  status: TaskDetail['status'];
  onChangeStatus: (status: TaskDetail['status']) => void;
};
export function TaskStatusSelector({ status }: TaskStatusSelectorProps) {
  return (
    <Card>
      <CardContent className="p-5 space-y-3">
        <p className="font-medium">Update Status</p>

        <div className="flex gap-2">
          {statuses.map(currentStatus => (
            <Button
              key={currentStatus}
              variant={currentStatus === status ? 'default' : 'outline'}
            >
              {currentStatus}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

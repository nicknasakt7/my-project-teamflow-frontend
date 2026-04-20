'use client';

import { useState } from 'react';
import { UserRoundCog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useReassignTask } from '@/lib/api/task/hooks/useReassignTask';
import ReassignMemberPicker from '@/components/features/tasks/reassign-member-picker';
import type { Task } from '@/lib/api/task/task.type';

type Props = {
  task: Task;
  currentEmployeeId: string;
};

export default function ReassignTaskDialog({ task, currentEmployeeId }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState('');

  const { mutate, isPending } = useReassignTask(currentEmployeeId);

  const handleConfirm = () => {
    if (!selectedId) return;
    mutate(
      { taskId: task.id, assignToId: selectedId },
      { onSuccess: () => { setOpen(false); setSelectedId(''); } },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5 shrink-0">
          <UserRoundCog className="size-3.5" />
          Reassign
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Reassign Task</DialogTitle>
        </DialogHeader>

        <ReassignMemberPicker
          excludeId={currentEmployeeId}
          selectedId={selectedId}
          onSelect={setSelectedId}
          isPending={isPending}
          onConfirm={handleConfirm}
          onCancel={() => { setOpen(false); setSelectedId(''); }}
          taskTitle={task.title}
        />
      </DialogContent>
    </Dialog>
  );
}

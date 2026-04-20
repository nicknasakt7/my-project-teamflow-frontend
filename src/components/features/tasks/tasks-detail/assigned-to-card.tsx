'use client';

import { useState } from 'react';
import { UserCircle2, UserRoundCog } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { taskClientService } from '@/lib/api/task/task.client-service';
import { toast } from 'sonner';
import ReassignMemberPicker from '@/components/features/tasks/reassign-member-picker';
import type { TaskDetailResponse } from '@/lib/api/task/task.type';

type Props = { task: TaskDetailResponse };

export default function AssignedToCard({ task }: Props) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState('');

  const role = session?.user?.roleType;
  const canReassign = role === 'ADMIN' || role === 'SUPER_ADMIN';

  const { mutate, isPending } = useMutation({
    mutationFn: (assignToId: string) =>
      taskClientService.reassignTask(task.id, assignToId, session?.user?.accessToken!),
    onSuccess: () => {
      toast.success('Task reassigned successfully');
      queryClient.invalidateQueries({ queryKey: ['task', task.id] });
      setOpen(false);
      setSelectedId('');
    },
    onError: (error: Error) => toast.error(error.message ?? 'Failed to reassign'),
  });

  const user = task.assignTo;
  if (!user) return null;

  const fullName = `${user.firstName} ${user.lastName}`;
  const initials = `${user.firstName[0]}${user.lastName[0]}`;

  return (
    <Card className="border-l-4 border-l-violet-400 shadow-md">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <UserCircle2 className="size-4 text-violet-500 dark:text-violet-400" />
            <p className="text-xs font-semibold uppercase tracking-wider text-violet-500 dark:text-violet-400">
              Assigned to
            </p>
          </div>

          {canReassign && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5 h-7 text-xs">
                  <UserRoundCog className="size-3.5" />
                  Reassign
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-sm">
                <DialogHeader>
                  <DialogTitle>Reassign Task</DialogTitle>
                </DialogHeader>
                <ReassignMemberPicker
                  excludeId={task.assignToId}
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                  isPending={isPending}
                  onConfirm={() => mutate(selectedId)}
                  onCancel={() => { setOpen(false); setSelectedId(''); }}
                  taskTitle={task.title}
                />
              </DialogContent>
            </Dialog>
          )}
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

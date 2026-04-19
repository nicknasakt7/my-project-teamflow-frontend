'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { taskClientService } from '../task.client-service';
import type { TaskStatus } from '../task.type';

export const useUpdateTaskStatus = (taskId: string) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (status: TaskStatus) =>
      taskClientService.updateTaskStatus(taskId, status, session?.user?.accessToken!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['task', taskId] });
      queryClient.invalidateQueries({ queryKey: ['my-tasks'] });
      queryClient.invalidateQueries({ queryKey: ['personal-tasks'] });
      toast.success('Status updated successfully');
    },
    onError: (error: any) => {
      const message = error?.message ?? 'Failed to update status';
      toast.error(message);
    },
  });
};

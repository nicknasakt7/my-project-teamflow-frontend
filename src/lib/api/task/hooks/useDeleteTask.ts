'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { taskClientService } from '../task.client-service';
import { toast } from 'sonner';

export const useDeleteTask = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId: string) =>
      taskClientService.deleteTask(taskId, session?.user?.accessToken!),
    onSuccess: () => {
      toast.success('Task deleted');
      queryClient.invalidateQueries({ queryKey: ['personal-tasks'] });
    },
    onError: (error: Error) => toast.error(error.message ?? 'Failed to delete task'),
  });
};

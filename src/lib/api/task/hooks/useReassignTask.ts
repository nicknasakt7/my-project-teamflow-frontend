'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { taskClientService } from '../task.client-service';

export const useReassignTask = (employeeId: string) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, assignToId }: { taskId: string; assignToId: string }) =>
      taskClientService.reassignTask(taskId, assignToId, session?.user?.accessToken!),
    onSuccess: () => {
      toast.success('Task reassigned successfully');
      queryClient.invalidateQueries({ queryKey: ['employee-tasks', employeeId] });
      queryClient.invalidateQueries({ queryKey: ['employee-summary', employeeId] });
    },
    onError: (error: Error) => toast.error(error.message ?? 'Failed to reassign task'),
  });
};

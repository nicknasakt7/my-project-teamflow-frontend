'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { taskClientService } from '../task.client-service';
import { toast } from 'sonner';

export const useCreatePersonalTask = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: {
      title: string;
      description: string;
      priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
      status: 'TODO';
      dueDate: string;
      isPersonal: true;
      assignToId?: string;
    }) => taskClientService.createTask(payload, session?.user?.accessToken!),
    onSuccess: () => {
      toast.success('Task created');
      queryClient.invalidateQueries({ queryKey: ['personal-tasks'] });
    },
    onError: (error: Error) => toast.error(error.message ?? 'Failed to create task'),
  });
};

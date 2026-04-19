'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { taskClientService } from '../task.client-service';

export const useTaskDetail = (taskId: string) => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ['task', taskId],
    queryFn: () => taskClientService.getTaskDetail(taskId, session?.user?.accessToken!),
    enabled: !!session?.user?.accessToken && !!taskId,
  });
};

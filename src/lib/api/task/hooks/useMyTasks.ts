'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { taskClientService, type GetMyTasksParams } from '../task.client-service';

export const useMyTasks = (params: GetMyTasksParams = {}) => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ['my-tasks', params.page, params.limit, params.search, params.status, params.priority],
    queryFn: () => taskClientService.getMyTasks(params, session?.user?.accessToken!),
    enabled: !!session?.user?.accessToken,
  });
};

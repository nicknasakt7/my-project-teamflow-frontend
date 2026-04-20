'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { taskClientService, type GetMyTasksParams } from '../task.client-service';

export const useAdminTasks = (params: GetMyTasksParams = {}) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const token = session?.user?.accessToken;

  return useQuery({
    queryKey: ['admin-tasks', userId, params.page, params.limit, params.search, params.status],
    queryFn: () => taskClientService.getAdminTasks(params, userId!, token!),
    enabled: !!token && !!userId,
  });
};

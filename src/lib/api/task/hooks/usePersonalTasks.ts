'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { taskClientService, type GetMyTasksParams } from '../task.client-service';

export const usePersonalTasks = (params: GetMyTasksParams = {}) => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ['personal-tasks', params.page, params.limit, params.search, params.status, params.priority],
    queryFn: () => taskClientService.getPersonalTasks(params, session?.user?.accessToken!),
    enabled: !!session?.user?.accessToken,
  });
};

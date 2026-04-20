'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { taskClientService } from '../task.client-service';

export const useEmployeeTasks = (employeeId: string) => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  return useQuery({
    queryKey: ['employee-tasks', employeeId],
    queryFn: () => taskClientService.getTasksByAssignee(employeeId, token!),
    enabled: !!token && !!employeeId,
  });
};

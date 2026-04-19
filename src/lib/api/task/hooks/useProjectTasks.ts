'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { taskClientService } from '../task.client-service';

export const useProjectTasks = (projectId: string) => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ['project-tasks', projectId],
    queryFn: () => taskClientService.getProjectTasks(projectId, session?.user?.accessToken!),
    enabled: !!session?.user?.accessToken && !!projectId,
  });
};

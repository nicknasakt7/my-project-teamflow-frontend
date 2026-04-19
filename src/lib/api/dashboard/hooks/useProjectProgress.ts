'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { dashboardClientService } from '../dashboard.client-service';

export const useProjectProgress = () => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ['dashboard-project-progress'],
    queryFn: async () =>
      dashboardClientService.getProjectProgress(session?.user?.accessToken!),
    enabled: !!session?.user?.accessToken,
  });
};

'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { dashboardClientService } from '../dashboard.client-service';

export const useDashboardSummary = () => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ['dashboard-summary'],
    queryFn: async () =>
      dashboardClientService.getSummary(session?.user?.accessToken!),
    enabled: !!session?.user?.accessToken,
  });
};

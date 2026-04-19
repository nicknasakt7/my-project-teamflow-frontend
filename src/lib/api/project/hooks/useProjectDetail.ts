'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { projectClientService } from '../project.client-service';

export const useProjectDetail = (projectId: string) => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  return useQuery({
    queryKey: ['project', projectId, token],
    queryFn: () => {
      if (!token) throw new Error('No access token');
      return projectClientService.getProjectDetail(projectId, token);
    },
    enabled: !!token && !!projectId,
  });
};

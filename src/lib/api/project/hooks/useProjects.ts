'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { projectClientService } from '../project.client-service';
import type { GetProjectsParams } from '../project.type';

export const useProjects = (params: GetProjectsParams = {}) => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ['projects', params.page, params.limit, params.search, params.status, params.createdBy],
    queryFn: async () => {
      const res = await projectClientService.getProjects(params, session?.user?.accessToken!);
      return res;
    },
    enabled: !!session?.user?.accessToken,
  });
};

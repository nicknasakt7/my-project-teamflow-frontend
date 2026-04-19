'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { commentClientService } from '../comment.client-service';

export const useComments = (taskId: string) => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ['comments', taskId],
    queryFn: () => commentClientService.getComments(taskId, session?.user?.accessToken!),
    enabled: !!session?.user?.accessToken && !!taskId,
  });
};

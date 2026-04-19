'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { commentClientService } from '../comment.client-service';
import { toast } from 'sonner';

export const useCreateComment = (taskId: string) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) =>
      commentClientService.createComment(taskId, content, session?.user?.accessToken!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', taskId] });
    },
    onError: (error: Error) => toast.error(error.message ?? 'Failed to post comment'),
  });
};

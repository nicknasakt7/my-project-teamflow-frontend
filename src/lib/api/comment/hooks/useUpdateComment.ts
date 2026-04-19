'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { commentClientService } from '../comment.client-service';
import { toast } from 'sonner';

export const useUpdateComment = (taskId: string) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId, content }: { commentId: string; content: string }) =>
      commentClientService.updateComment(commentId, content, session?.user?.accessToken!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', taskId] });
    },
    onError: (error: Error) => toast.error(error.message ?? 'Failed to update comment'),
  });
};

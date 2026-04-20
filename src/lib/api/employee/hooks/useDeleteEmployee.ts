'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { employeeClientService } from '../employee.client-service';

export const useDeleteEmployee = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      employeeClientService.deleteEmployee(id, session?.user?.accessToken!),
    onSuccess: () => {
      toast.success('Employee deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
    onError: (error: Error) => toast.error(error.message ?? 'Failed to delete employee'),
  });
};

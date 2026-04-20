'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { employeeClientService, type UpdateEmployeePayload } from '../employee.client-service';

export const useUpdateEmployee = (employeeId: string) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateEmployeePayload) =>
      employeeClientService.updateEmployee(employeeId, payload, session?.user?.accessToken!),
    onSuccess: () => {
      toast.success('Profile updated successfully');
      queryClient.invalidateQueries({ queryKey: ['employee-summary', employeeId] });
    },
    onError: (error: Error) => toast.error(error.message ?? 'Failed to update profile'),
  });
};

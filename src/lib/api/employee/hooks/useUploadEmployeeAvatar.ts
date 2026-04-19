'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { apiClient } from '../../api-client';

export const useUploadEmployeeAvatar = (employeeId: string) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => {
      const form = new FormData();
      form.append('file', file);
      return apiClient.post<string>(`/employees/${employeeId}/avatar`, form, session?.user?.accessToken!);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employee-summary', employeeId] });
    },
  });
};

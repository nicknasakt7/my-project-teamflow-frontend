'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { employeeClientService } from '../employee.client-service';

export const useMe = () => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const res = await employeeClientService.getMe(session?.user?.accessToken!);
      return res;
    },
    enabled: !!session?.user?.accessToken,
  });
};

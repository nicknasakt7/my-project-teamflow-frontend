'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { employeeClientService } from '../employee.client-service';
import type { RoleType, Status, Position, Level } from '../../user/user.type';

type UseEmployeesParams = {
  search?: string;
  page?: number;
  limit?: number;
  role?: RoleType;
  status?: Status;
  position?: Position;
  level?: Level;
};

export const useEmployees = (params: UseEmployeesParams) => {
  const { data: session } = useSession();

  const token = session?.user?.accessToken;

  return useQuery({
    queryKey: ['employees', params, token],
    queryFn: () => {
      if (!token) throw new Error('No access token');
      return employeeClientService.getEmployees(params, token);
    },
    enabled: !!token,
  });
};

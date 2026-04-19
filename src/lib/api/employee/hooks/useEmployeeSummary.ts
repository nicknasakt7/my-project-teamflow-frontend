'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { apiClient } from '../../api-client';
import type { User } from '../../user/user.type';

type TaskStats = {
  total: number;
  done: number;
  inProgress: number;
  inReview: number;
  todo: number;
  overdue: number;
  completionRate: number;
};

type EmployeeProject = {
  id: string;
  title: string;
  status: string;
  totalTasks: number;
  doneTasks: number;
};

export type EmployeeSummary = {
  employee: User;
  taskStats: TaskStats;
  projects: EmployeeProject[];
};

export const useEmployeeSummary = (employeeId: string) => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  return useQuery({
    queryKey: ['employee-summary', employeeId, token],
    queryFn: () => apiClient.get<EmployeeSummary>(`/employees/${employeeId}/summary`, undefined, token!),
    enabled: !!token && !!employeeId,
  });
};

import { apiClient } from '../api-client';
import type { User, RoleType, Status, Position, Level } from '../user/user.type';

type GetEmployeesParams = {
  search?: string;
  page?: number;
  limit?: number;
  role?: RoleType;
  status?: Status;
  position?: Position;
  level?: Level;
};

type GetEmployeesResponse = {
  employees: User[];
  meta: { total: number; page: number; limit: number };
};

const getMe = (token: string) => apiClient.get<User>('/employees/me', undefined, token);

const getEmployees = (params: GetEmployeesParams, token: string) =>
  apiClient.get<GetEmployeesResponse>('/employees', params as Record<string, unknown>, token);

export const employeeClientService = { getMe, getEmployees };

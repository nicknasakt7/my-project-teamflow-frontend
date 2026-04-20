import { apiClient } from '../api-client';
import type { User, RoleType, Status, Position, Level, Gender } from '../user/user.type';

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

export type UpdateEmployeePayload = {
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  gender?: Gender;
  position?: Position;
  level?: Level;
  status?: Status;
};

const getMe = (token: string) => apiClient.get<User>('/employees/me', undefined, token);

const getEmployees = (params: GetEmployeesParams, token: string) =>
  apiClient.get<GetEmployeesResponse>('/employees', params as Record<string, unknown>, token);

const updateEmployee = (id: string, payload: UpdateEmployeePayload, token: string) =>
  apiClient.patch<User>(`/employees/${id}`, payload, token);

const deleteEmployee = (id: string, token: string) =>
  apiClient.delete<void>(`/employees/${id}`, token);

export const employeeClientService = { getMe, getEmployees, updateEmployee, deleteEmployee };

import { api } from '../client';
import type { User } from '../user/user.type';

type GetAllEmployeeResponse = {
  employees: User[];
  meta: { total: number; page: number; limit: number };
};

const getEmployees = (params?: { limit?: number }) => {
  const query = params?.limit ? `?limit=${params.limit}` : '';
  return api.get<GetAllEmployeeResponse>(`/employees${query}`);
};

export const employeeService = { getEmployees };

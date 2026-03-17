import {
  CreateMemberInput,
  RegisterAdminInput,
} from '@/lib/schemas/auth.schema';
import { api } from '../client';
import { User } from '../user/user.type';

const registerAdmin = (input: RegisterAdminInput) =>
  api.post<void>('/employees', input);

const createMember = (input: CreateMemberInput) =>
  api.post('/employees/create', input);

const login = (input: unknown) =>
  api.post<{ accessToken: string; user: User }>('/auth/login', input);

export const authService = { registerAdmin, createMember, login };

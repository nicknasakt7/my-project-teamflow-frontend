import {
  CreateMemberInput,
  RegisterAdminInput,
} from '@/lib/schemas/auth.schema';
import { api } from '../client';
import { User } from '../user/user.type';

const registerAdmin = (input: RegisterAdminInput) =>
  api.post<User>('/employees', input);

const createMember = (input: CreateMemberInput) =>
  api.post<User>('/employees/create', input);

const login = (input: unknown) =>
  api.post<{ accessToken: string; user: User }>('/auth/login', input);

const forgotPassword = (email: string) =>
  api.post<void>('/auth/forgot-password', { email });

const resetPassword = (token: string, newPassword: string) =>
  api.post<void>('/auth/reset-password', { token, newPassword });

export const authService = { registerAdmin, createMember, login, forgotPassword, resetPassword };

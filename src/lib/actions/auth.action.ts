'use server';
import type { ActionResult } from './action.types';

import {
  CreateMemberInput,
  LoginInput,
  RegisterAdminInput,
} from '../schemas/auth.schema';
import { authService } from '../api/auth/auth.service';
import { formatActionError } from './action.util';
import { redirect } from 'next/navigation';
import { signIn, signOut } from '../auth/auth';

export const registerAdmin = async (
  input: RegisterAdminInput,
): Promise<ActionResult<{ id: string }>> => {
  try {
    const user = await authService.registerAdmin(input);
    return { success: true, data: { id: user.id } };
  } catch (error) {
    return formatActionError(error);
  }
};

export const createMember = async (
  input: CreateMemberInput,
): Promise<ActionResult<{ id: string }>> => {
  try {
    const user = await authService.createMember(input);
    return { success: true, data: { id: user.id } };
  } catch (error) {
    return formatActionError(error);
  }
};

export const login = async (input: LoginInput): Promise<ActionResult> => {
  try {
    const res = signIn('credentials', { ...input, redirect: false });
    if (!res || (await res).error) {
      return { success: false, code: 'INVALID_CREDENTIALS' };
    }
  } catch (error) {
    void error;
    return { success: false, code: 'INVALID_CREDENTIALS' };
  }
  redirect('/projects');
};

export const logout = async (): Promise<void> => {
  await signOut({ redirectTo: '/' });
};

export const forgotPassword = async (email: string): Promise<ActionResult> => {
  try {
    await authService.forgotPassword(email);
    return { success: true };
  } catch (error) {
    return formatActionError(error);
  }
};

export const resetPassword = async (token: string, newPassword: string): Promise<ActionResult> => {
  try {
    await authService.resetPassword(token, newPassword);
    return { success: true };
  } catch (error) {
    return formatActionError(error);
  }
};

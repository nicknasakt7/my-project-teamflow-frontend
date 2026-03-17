'use server';
import { ActionResult } from 'next/dist/shared/lib/app-router-types';

import {
  CreateMemberInput,
  LoginInput,
  RegisterAdminInput,
} from '../schemas/auth.schema';
import { authService } from '../api/auth/auth.service';
import { formatActionError } from './action.util';
import { redirect } from 'next/navigation';
import { signIn } from 'next-auth/react';

export const registerAdmin = async (
  input: RegisterAdminInput,
): Promise<ActionResult> => {
  try {
    await authService.registerAdmin(input);
  } catch (error) {
    return formatActionError(error);
  }
  redirect('/register-admin');
};
export const createMember = async (
  input: CreateMemberInput,
): Promise<ActionResult> => {
  try {
    console.log('1');
    await authService.createMember(input);
    console.log('2');
    redirect('/login');
  } catch (error) {
    console.log('error', error);
    return formatActionError(error);
  }
};

export const login = async (input: LoginInput): Promise<ActionResult> => {
  try {
    await signIn('credentials', { ...input, redirect: false });
  } catch {
    return { success: false, code: 'INVALID_CREDENTIALS' };
  }
  redirect('/');
};

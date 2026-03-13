import { ActionResult } from 'next/dist/shared/lib/app-router-types';
import { redirect } from 'next/navigation';
import { LoginInput } from '../schemas/auth.schema';

export const login = async (input: LoginInput): Promise<ActionResult> => {
  try {
    await signIn('credentials', { ...input, redirect: false });
  } catch {
    return { success: false, code: 'INVALID_CREDENTIALS' };
  }
  redirect('/');
};

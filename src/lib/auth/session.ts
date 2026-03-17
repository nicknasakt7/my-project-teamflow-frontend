import { redirect } from 'next/navigation';
import z from 'zod';
import { auth } from '@/lib/auth/auth';

const currentUserSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  birthDate: z.date().optional(),
  accessToken: z.string(),
  profileImageUrl: z.string(),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  roleType: z.enum(['ADMIN', 'SUPER_ADMIN', 'EMPLOYEE']),
  position: z.enum([
    'ENGINEERING_MANAGER',
    'PRODUCT_MANAGER',
    'SCRUM_MASTER',
    'PROJECT_MANAGER',
    'FRONTEND_DEVELOPER',
    'BACKEND_DEVELOPER',
    'FULLSTACK_DEVELOPER',
    'DEVOPT_ENGINEERING',
    'QA_ENGINEER',
    'QA_AUTOMATE_ENGINEER',
    'SOFTWARE_TESTER',
    'UX_DESIGNER',
    'UI_DESIGNER',
    'UX_UI_DESIGNER',
    'SYSTEM_ADMINISTRATOR',
    'CLOUD_ENGINEERING',
    'DATABASE_ADMINISTRATOR',
  ]),
  level: z.enum(['JUNIOR', 'MID', 'SENIOR', 'LEAD']),
});

export const getCurrentUser = async () => {
  const session = await auth();
  console.log(session);
  if (!session) redirect('/login');

  const { success, data, error } = currentUserSchema.safeParse(session.user);
  if (!success) {
    console.log('Session user is invalid: \n', z.prettifyError(error));
    redirect('/login');
  }

  return data;
};

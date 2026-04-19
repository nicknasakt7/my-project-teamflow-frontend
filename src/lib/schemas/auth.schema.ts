import z from 'zod';

export const baseRegisterSchema = z.object({
  email: z.email('Invalid email format'),
  password: z
    .string()
    .regex(
      /^[0-9a-zA-Z]{6,}$/,
      'Password must be at least 6 characters and contains numbers or alphabets',
    ),

  firstName: z.string().min(1, 'First name is required').max(100),

  lastName: z.string().min(1, 'Last name is required').max(100),

  birthDate: z.date(),

  gender: z.enum(['MALE', 'FEMALE', 'OTHER'], 'Gender is required'),

  level: z.enum(
    ['JUNIOR', 'MID', 'SENIOR', 'LEAD'],
    'Employment level is required',
  ),
  status: z.enum(['ACTIVE', 'INACTIVE', 'LEAVE']).optional(),
});

export type BaseRegisterInput = z.infer<typeof baseRegisterSchema>;

export const registerAdminSchema = baseRegisterSchema.extend({
  position: z.enum([
    'ENGINEERING_MANAGER',
    'PRODUCT_MANAGER',
    'SCRUM_MASTER',
    'PROJECT_MANAGER',
  ]),
});

export type RegisterAdminInput = z.infer<typeof registerAdminSchema>;

export const createMemberSchema = baseRegisterSchema.extend({
  roleType: z.enum(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']),
  position: z.enum([
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
});

export type CreateMemberInput = z.infer<typeof createMemberSchema>;

export const loginSchema = z.object({
  email: z.email('Email is required'),
  password: z.string().regex(/^[0-9a-zA-Z]{6,}$/, 'Password is required'),
});
export type LoginInput = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
  email: z.email('Invalid email format'),
});
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .regex(/^[0-9a-zA-Z]{6,}$/, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

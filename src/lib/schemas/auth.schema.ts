import z from 'zod';

export const registerSchema = z.object({
  email: z.email('Invalid email format').min(1, 'Email is required'),

  password: z
    .string()
    .regex(
      /^[0-9a-zA-Z]{6,}$/,
      'Password must be at least 6 characters and contains numbers or alphabets',
    ),

  firstName: z.string().min(1, 'First name is required').max(100),

  lastName: z.string().min(1, 'Last name is required').max(100),

  birthDate: z.date('Birth date is required'),

  gender: z.enum(['MALE', 'FEMALE', 'OTHER'], 'Gender is required'),

  position: z.enum(
    [
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
    ],
    'Position is required',
  ),

  level: z.enum(
    ['JUNIOR', 'MID', 'SENIOR', 'LEAD'],
    'Employment level is required',
  ),
  status: z.enum(['ACTIVE', 'INACTIVE', 'LEAVE'], 'Status is required'),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.email('Email is required'),
  password: z.string().regex(/^[0-9a-zA-z]{6,}$/, 'Password is required'),
});
export type LoginInput = z.infer<typeof loginSchema>;

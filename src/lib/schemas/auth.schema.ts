import z from 'zod';

export const registerAdminSchema = z.object({
  email: z.string().email('Invalid email format').min(1, 'Email is required'),

  password: z
    .string()
    .regex(/^[0-9a-zA-Z]{6,}$/, 'Password must be at least 6 characters'),

  firstName: z.string().min(1, 'First name is required').max(100),

  lastName: z.string().min(1, 'Last name is required').max(100),

  birthDate: z.string().optional(),

  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),

  position: z.enum([
    'PRODUCT_MANAGER',
    'FRONTEND_DEV',
    'FULLSTACK_DEV',
    'SCRUM_MASTER',
    'DEVOPS_ENG',
    'CLOUD_ENG',
  ]),

  level: z.enum(['JUNIOR', 'MID', 'SENIOR']).optional(),
});

export type RegisterAdminInput = z.infer<typeof registerAdminSchema>;

export const loginSchema = z.object({
  email: z.email('Email is required'),
  password: z.string().regex(/^[0-9a-zA-z]{6,}$/, 'Password is required'),
});
export type LoginInput = z.infer<typeof loginSchema>;

import z from 'zod';

export const serverEnvSchema = z.object({
  BACKEND_URL: z.url(),
  AUTH_SECRET: z.string().min(32),
});

const serverRusult = serverEnvSchema.safeParse(process.env);
if (!serverRusult.success) {
  console.error(
    'Invalid server environment variables: \n',
    z.prettifyError(serverRusult.error),
  );
  process.exit(1);
}
export const serverEnv = serverRusult.data;

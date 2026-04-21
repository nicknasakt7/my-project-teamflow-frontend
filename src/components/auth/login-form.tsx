'use client';
import { Loader } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';

import { Controller, useForm } from 'react-hook-form';
import { LoginInput, loginSchema } from '@/lib/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { login } from '@/lib/actions/auth.action';
import { Alert, AlertTitle } from '../ui/alert';

const DEMO_ACCOUNTS = [
  { label: 'Super Admin', email: 'superadmin@gmail.com', password: 'admin123', style: 'bg-violet-100 text-violet-700 hover:bg-violet-200 dark:bg-violet-900/30 dark:text-violet-300' },
  { label: 'Admin', email: 'b@mail.com', password: '654321', style: 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300' },
  { label: 'Member', email: 'noah.backend@mail.com', password: '123456', style: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300' },
];

export default function LoginForm() {
  const {
    handleSubmit,
    control,
    setError,
    setValue,
    formState: { errors },
  } = useForm<LoginInput>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLoginResult = async (loginFn: () => Promise<{ success: boolean }>) => {
    const res = await loginFn();
    if (!res.success) {
      setError('root', {
        message: 'The email or password you entered is incorrect',
      });
    } else {
      router.refresh();
      router.push('/projects');
    }
  };

  const onSubmit = (data: LoginInput) => {
    startTransition(() => handleLoginResult(() => login(data)));
  };

  const handleQuickLogin = (email: string, password: string) => {
    startTransition(() => handleLoginResult(() => login({ email, password })));
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors.root && (
          <Alert>
            <AlertTitle className="text-destructive text-lg">
              {errors.root.message}
            </AlertTitle>
          </Alert>
        )}
        <FieldGroup className="gap-4">
          {/* Email */}
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-sm" htmlFor={field.name}>
                  Email
                </FieldLabel>

                <Input
                  {...field}
                  id={field.name}
                  placeholder="enter your email"
                  aria-invalid={fieldState.invalid}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Password */}
          <Controller
            control={control}
            name="password"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-lg" htmlFor={field.name}>
                  Password
                </FieldLabel>

                <Input
                  {...field}
                  id={field.name}
                  type="password"
                  placeholder="enter your password"
                  aria-invalid={fieldState.invalid}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Button */}
          <Field>
            <Button
              size="default"
              className="w-full font-semibold"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader className="animate-spin mr-2 size-4" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </Field>
        </FieldGroup>
      </form>

      {/* Forgot password */}
      <div className="flex justify-end text-md px-4 -mt-5">
        <Link href="/forgot-password" className="text-primary hover:underline text-sm">
          Forgot password?
        </Link>
      </div>

      {/* Quick login */}
      <div className="px-4 pb-3 mt-1">
        <div className="relative my-3">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-card px-2 text-muted-foreground">Try a demo account</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {DEMO_ACCOUNTS.map(account => (
            <button
              key={account.label}
              type="button"
              disabled={isPending}
              onClick={() => handleQuickLogin(account.email, account.password)}
              className={`w-full rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 ${account.style}`}
            >
              {isPending ? <Loader className="animate-spin mx-auto size-4" /> : `Try as ${account.label}`}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

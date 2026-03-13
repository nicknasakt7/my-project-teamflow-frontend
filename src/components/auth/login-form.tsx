'use client';
import { Loader } from 'lucide-react';
import { Button } from '../ui/button';

import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';

import { Controller, useForm } from 'react-hook-form';
import { LoginInput, loginSchema } from '@/lib/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import Link from 'next/link';

export default function LoginForm() {
  const { handleSubmit, control } = useForm<LoginInput>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: LoginInput) => {
    startTransition(async () => {
      const res = await login(data);
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          {/* Email */}
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-lg" htmlFor={field.name}>
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

          {/* Forgot password */}
          <div className="flex justify-end text-md">
            <a className="text-primary hover:underline cursor-pointer">
              Forgot password?
            </a>
          </div>

          {/* Button */}
          <Field>
            <Button
              size="lg"
              className="w-full text-lg font-semibold"
              disabled={isPending}
            >
              <Link href="/dashboard">
                {isPending ? (
                  <>
                    <Loader className="animate-spin mr-2 size-4" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Link>
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </>
  );
}

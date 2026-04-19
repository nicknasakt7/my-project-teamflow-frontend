'use client';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition, useState } from 'react';
import { Loader, MailCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { ForgotPasswordInput, forgotPasswordSchema } from '@/lib/schemas/auth.schema';
import { forgotPassword } from '@/lib/actions/auth.action';

export default function ForgotPasswordForm() {
  const [sent, setSent] = useState(false);
  const [isPending, startTransition] = useTransition();

  const { handleSubmit, control } = useForm<ForgotPasswordInput>({
    defaultValues: { email: '' },
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordInput) => {
    startTransition(async () => {
      await forgotPassword(data.email);
      setSent(true);
    });
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-4 py-6 text-center">
        <MailCheck className="size-12 text-primary" />
        <h3 className="text-lg font-semibold">Check your email</h3>
        <p className="text-sm text-muted-foreground max-w-xs">
          If an account exists for that email, we&apos;ve sent a password reset link. It expires in 1 hour.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="text-sm" htmlFor={field.name}>Email</FieldLabel>
              <Input
                {...field}
                id={field.name}
                placeholder="Enter your email address"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Field>
          <Button className="w-full font-semibold" disabled={isPending}>
            {isPending ? (
              <>
                <Loader className="animate-spin mr-2 size-4" />
                Sending...
              </>
            ) : (
              'Send Reset Link'
            )}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}

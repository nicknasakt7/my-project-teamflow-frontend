'use client';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { ResetPasswordInput, resetPasswordSchema } from '@/lib/schemas/auth.schema';
import { resetPassword } from '@/lib/actions/auth.action';

export default function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const { handleSubmit, control } = useForm<ResetPasswordInput>({
    defaultValues: { newPassword: '', confirmPassword: '' },
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (data: ResetPasswordInput) => {
    startTransition(async () => {
      const res = await resetPassword(token, data.newPassword);
      if (!res.success) {
        toast.error(res.message ?? 'Invalid or expired reset link');
        return;
      }
      toast.success('Password reset successfully');
      router.push('/login');
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          control={control}
          name="newPassword"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="text-sm" htmlFor={field.name}>New Password</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="password"
                placeholder="Enter new password"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="text-sm" htmlFor={field.name}>Confirm Password</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="password"
                placeholder="Confirm new password"
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
                Resetting...
              </>
            ) : (
              'Reset Password'
            )}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}

'use client';

import DatePickerInput from '@/components/shared/date-picker-input';
import { Button } from '@/components/ui/button';

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';

import { Input } from '@/components/ui/input';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Loader } from 'lucide-react';
import { useTransition } from 'react';

import GenderSelect from '@/components/shared/gender-select';
import PositionSelect from '@/components/shared/position-select';
import LevelSelect from '@/components/shared/level-select';
import {
  CreateMemberInput,
  createMemberSchema,
} from '@/lib/schemas/auth.schema';
import { createMember } from '@/lib/actions/auth.action';

export default function CreateMemberForm() {
  const { handleSubmit, control, setError } = useForm<CreateMemberInput>({
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      birthDate: undefined,
      gender: undefined,
      position: undefined,
      level: undefined,
      status: 'ACTIVE',
    },
    resolver: zodResolver(createMemberSchema),
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: CreateMemberInput) => {
    startTransition(async () => {
      const res = await createMember(data);
      if (!res.success && res.code === 'EMAIL_ALREADY_EXISTS') {
        setError('email', { message: res.message });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup className="gap-4 space-y-2">
        {/* First Name / Last Name */}
        <div className="grid grid-cols-2 gap-4">
          <Controller
            control={control}
            name="firstName"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className="text-lg">
                  First Name
                </FieldLabel>

                <Input
                  {...field}
                  id={field.name}
                  placeholder="First Name"
                  aria-invalid={fieldState.invalid}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={control}
            name="lastName"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className="text-lg">
                  Last Name
                </FieldLabel>

                <Input
                  {...field}
                  id={field.name}
                  placeholder="Last Name"
                  aria-invalid={fieldState.invalid}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        {/* Birth Date */}
        <Controller
          control={control}
          name="birthDate"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name} className="text-lg">
                Birth Date
              </FieldLabel>

              <DatePickerInput
                id={field.name}
                value={field.value}
                isValid={!fieldState.invalid}
                onValueChange={field.onChange}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Gender */}
        <Controller
          control={control}
          name="gender"
          render={({ field, fieldState }) => (
            <GenderSelect field={field} fieldState={fieldState} />
          )}
        />

        {/* Email */}
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name} className="text-lg">
                Email
              </FieldLabel>

              <Input
                {...field}
                id={field.name}
                placeholder="Email"
                aria-invalid={fieldState.invalid}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Password */}
        <Controller
          control={control}
          name="password"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name} className="text-lg">
                Password
              </FieldLabel>

              <Input
                {...field}
                id={field.name}
                type="password"
                placeholder="Password"
                aria-invalid={fieldState.invalid}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Position */}
        <Controller
          control={control}
          name="position"
          render={({ field, fieldState }) => (
            <PositionSelect field={field} fieldState={fieldState} />
          )}
        />

        {/* Level */}
        <Controller
          control={control}
          name="level"
          render={({ field, fieldState }) => (
            <LevelSelect field={field} fieldState={fieldState} />
          )}
        />

        {/* Submit */}
        <Field>
          <Button
            className="rounded-full h-12 disabled:opacity-80 mt-4 text-lg font-semibold"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader className="animate-spin" />
                Creating member
              </>
            ) : (
              'Add Member'
            )}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}

'use client';

import DatePickerInput from '@/components/shared/date-picker-input';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Camera, Loader, UserCircle2 } from 'lucide-react';
import { useRef, useState, useTransition } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

import GenderSelect from '@/components/shared/gender-select';
import LevelSelect from '@/components/shared/level-select';
import PositionAdminSelect from '@/components/shared/position-admin-select';
import { RegisterAdminInput, registerAdminSchema } from '@/lib/schemas/auth.schema';
import { registerAdmin } from '@/lib/actions/auth.action';
import { apiClient } from '@/lib/api/api-client';

export default function RegisterMemberForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const fileRef = useRef<HTMLInputElement>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const { handleSubmit, control, setError } = useForm<RegisterAdminInput>({
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      birthDate: undefined,
      gender: undefined,
      position: undefined,
      level: undefined,
      status: undefined,
    },
    resolver: zodResolver(registerAdminSchema),
  });

  const [isPending, startTransition] = useTransition();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
    e.target.value = '';
  };

  const onSubmit = (data: RegisterAdminInput) => {
    startTransition(async () => {
      const res = await registerAdmin(data);
      if (!res?.success) {
        if (res?.code === 'EMAIL_ALREADY_EXISTS') {
          setError('email', { message: res.message });
        } else {
          toast.error(res?.message ?? 'Failed to register admin');
        }
        return;
      }

      if (avatarFile && res.data?.id) {
        try {
          const form = new FormData();
          form.append('file', avatarFile);
          await apiClient.post(`/employees/${res.data.id}/avatar`, form, session?.user?.accessToken);
        } catch {
          toast.warning('Admin created but profile photo upload failed');
        }
      }

      toast.success('Admin registered successfully');
      router.push('/register-admin');
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup className="gap-4 space-y-2">
        {/* Avatar Picker */}
        <div className="flex items-center gap-5 mb-2">
          <div className="relative shrink-0">
            <div className="w-24 h-24 rounded-xl border-2 border-dashed border-border bg-muted flex items-center justify-center overflow-hidden">
              {avatarPreview ? (
                <Image src={avatarPreview} alt="Avatar preview" width={96} height={96} className="w-full h-full object-cover" />
              ) : (
                <UserCircle2 className="size-12 text-muted-foreground/50" />
              )}
            </div>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center shadow-md hover:opacity-80 transition-opacity"
            >
              <Camera className="size-4" />
            </button>
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          <div className="flex flex-col gap-2">
            <div>
              <p className="font-semibold text-base">Member Avatar</p>
              <p className="text-sm text-muted-foreground">Recommended: 400×400px. JPG or PNG.</p>
            </div>
            <Button type="button" variant="outline" size="sm" className="w-fit" onClick={() => fileRef.current?.click()}>
              Upload Photo
            </Button>
          </div>
        </div>

        {/* First Name / Last Name */}
        <div className="grid grid-cols-2 gap-4">
          <Controller
            control={control}
            name="firstName"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className="text-lg">First Name</FieldLabel>
                <Input {...field} id={field.name} placeholder="First Name" aria-invalid={fieldState.invalid} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            control={control}
            name="lastName"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className="text-lg">Last Name</FieldLabel>
                <Input {...field} id={field.name} placeholder="Last Name" aria-invalid={fieldState.invalid} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
              <FieldLabel htmlFor={field.name} className="text-lg">Date Of Birth</FieldLabel>
              <DatePickerInput id={field.name} value={field.value} isValid={!fieldState.invalid} onValueChange={field.onChange} />
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
              <FieldLabel htmlFor={field.name} className="text-lg">Email</FieldLabel>
              <Input {...field} id={field.name} placeholder="Email" aria-invalid={fieldState.invalid} />
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
              <FieldLabel htmlFor={field.name} className="text-lg">Password</FieldLabel>
              <Input {...field} id={field.name} type="password" placeholder="Password" aria-invalid={fieldState.invalid} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Position */}
        <Controller
          control={control}
          name="position"
          render={({ field, fieldState }) => (
            <PositionAdminSelect field={field} fieldState={fieldState} />
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
          <Button className="rounded-full h-12 disabled:opacity-80 mt-4 text-lg font-semibold" disabled={isPending}>
            {isPending ? (
              <>
                <Loader className="animate-spin" />
                Registering admin...
              </>
            ) : (
              'Register Admin'
            )}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}

'use client';

import Link from 'next/link';
import { useState, useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader, CheckCircle2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import DatePickerInput from '@/components/shared/date-picker-input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import { CreateProjectInput, createProjectSchema } from '@/lib/schemas/project.schema';
import { createProject } from '@/lib/actions/project.action';

export default function CreateProjectForm() {
  const router = useRouter();
  const { handleSubmit, control } = useForm<CreateProjectInput>({
    defaultValues: { title: '', description: '', dueDate: undefined },
    resolver: zodResolver(createProjectSchema),
  });

  const [isPending, startTransition] = useTransition();
  const [createdProjectId, setCreatedProjectId] = useState<string | null>(null);

  const onSubmit = (data: CreateProjectInput) => {
    startTransition(async () => {
      const res = await createProject(data);
      if (!res.success) {
        toast.error(res.message ?? 'Failed to create project');
        return;
      }
      setCreatedProjectId(res.data!.id);
    });
  };

  return (
    <>
      <Card>
        <CardHeader className="text-xl">
          <CardTitle>Project Information</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup className="space-y-6">
              {/* Title */}
              <Controller
                control={control}
                name="title"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-lg">
                      Title <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      placeholder="Enter project title"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* Description */}
              <Controller
                control={control}
                name="description"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-lg">
                      Description <span className="text-red-500">*</span>
                    </FieldLabel>
                    <textarea
                      {...field}
                      id={field.name}
                      placeholder="Enter project description"
                      className="w-full border rounded-md p-2 h-40 bg-background text-sm"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* Due Date */}
              <Controller
                control={control}
                name="dueDate"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-lg">
                      Due Date <span className="text-red-500">*</span>
                    </FieldLabel>
                    <DatePickerInput
                      id={field.name}
                      value={field.value}
                      isValid={!fieldState.invalid}
                      onValueChange={field.onChange}
                      placeholder="Select due date"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* Buttons */}
              <div className="flex justify-end gap-3 border-t pt-4">
                <Button asChild variant="outline" disabled={isPending}>
                  <Link href="/projects">Cancel</Link>
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Loader className="animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create Project'
                  )}
                </Button>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      {/* Dialog: create task? */}
      <AlertDialog open={!!createdProjectId}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-5 text-emerald-500" />
              <AlertDialogTitle>Project created!</AlertDialogTitle>
            </div>
            <AlertDialogDescription>
              Do you want to create a task for this project now?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => router.push('/projects')}>
              Not now
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => router.push(`/projects/${createdProjectId}/create-task`)}
            >
              Create Task
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

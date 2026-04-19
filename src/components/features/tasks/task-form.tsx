'use client';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { CheckSquare, Loader } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import DatePickerInput from '@/components/shared/date-picker-input';
import AssignSelect from './assign-select';
import PrioritySelect from './priority-select';

import { CreateTaskInput, createTaskSchema } from '@/lib/schemas/task.schema';
import { createTask } from '@/lib/actions/task.action';

type Member = { id: string; firstName: string; lastName: string };

type CreateTaskFormProps = {
  projectId: string;
  members: Member[];
};

export default function CreateTaskForm({
  projectId,
  members,
}: CreateTaskFormProps) {
  const { handleSubmit, control } = useForm<CreateTaskInput>({
    defaultValues: {
      title: '',
      description: '',
      priority: undefined,
      dueDate: undefined,
      assignToId: '',
    },
    resolver: zodResolver(createTaskSchema),
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: CreateTaskInput) => {
    startTransition(async () => {
      const res = await createTask(data, projectId);
      if (res && !res.success) {
        toast.error(res.message ?? 'Failed to create task');
      }
    });
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader className="flex flex-row items-center gap-6">
        <div className="bg-chart-4 p-2 rounded-md">
          <CheckSquare className="size-6 bg-chart-4" />
        </div>
        <div>
          <CardTitle className="text-xl">Task Details</CardTitle>
          <p className="text-md text-muted-foreground">
            Define the task scope, assignment, and timeline.
          </p>
        </div>
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
                  <FieldLabel className="text-md">
                    Task Title <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    placeholder="e.g. Implement user authentication"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Description */}
            <Controller
              control={control}
              name="description"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-md">Description</FieldLabel>
                  <textarea
                    {...field}
                    id={field.name}
                    placeholder="Describe the task in detail..."
                    className="border rounded-md w-full h-40 p-2 bg-background text-sm"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Priority */}
            <Controller
              control={control}
              name="priority"
              render={({ field, fieldState }) => (
                <PrioritySelect field={field} fieldState={fieldState} />
              )}
            />

            {/* Due Date */}
            <Controller
              control={control}
              name="dueDate"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-md">
                    Due Date <span className="text-red-500">*</span>
                  </FieldLabel>
                  <DatePickerInput
                    id={field.name}
                    value={field.value}
                    isValid={!fieldState.invalid}
                    onValueChange={field.onChange}
                    placeholder="Select due date"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Assign */}
            <Controller
              control={control}
              name="assignToId"
              render={({ field, fieldState }) => (
                <AssignSelect
                  field={field}
                  fieldState={fieldState}
                  members={members}
                />
              )}
            />

            {/* Buttons */}
            <div className="flex justify-end gap-6 pt-4">
              <Button
                type="button"
                variant="outline"
                disabled={isPending}
              >
                <a href={`/projects/${projectId}`}>Cancel</a>
              </Button>

              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader className="animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Task'
                )}
              </Button>
            </div>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}

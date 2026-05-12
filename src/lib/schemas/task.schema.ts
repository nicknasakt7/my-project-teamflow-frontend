import z from 'zod';
import { format } from 'date-fns';

const baseCreateTaskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT'], 'Priority is required'),
  dueDate: z.date(),
  assignToId: z.string().min(1, 'Assignee is required'),
});

export type CreateTaskInput = z.infer<typeof baseCreateTaskSchema>;

export const createTaskSchema = (projectDueDate?: Date | null) => {
  if (!projectDueDate) return baseCreateTaskSchema;
  return baseCreateTaskSchema.refine(
    (data) => !data.dueDate || data.dueDate <= projectDueDate,
    {
      message: `Due date must be on or before project deadline (${format(projectDueDate, 'dd MMM yyyy')})`,
      path: ['dueDate'],
    },
  );
};

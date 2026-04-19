'use server';

import { redirect } from 'next/navigation';
import { taskService } from '../api/task/task.service';
import type { CreateTaskInput } from '../schemas/task.schema';
import { formatActionError } from './action.util';
import type { ActionResult } from './action.types';

export const createTask = async (
  input: CreateTaskInput,
  projectId: string,
): Promise<ActionResult> => {
  try {
    await taskService.createTask({
      title: input.title,
      description: input.description,
      priority: input.priority,
      status: 'TODO',
      dueDate: input.dueDate.toISOString(),
      isPersonal: false,
      assignToId: input.assignToId,
      projectId,
    });
  } catch (error) {
    return formatActionError(error);
  }
  redirect(`/projects/${projectId}`);
};

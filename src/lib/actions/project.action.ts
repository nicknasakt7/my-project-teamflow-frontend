'use server';

import { redirect } from 'next/navigation';
import { auth } from '../auth/auth';
import { projectService } from '../api/project/project.service';
import type { CreateProjectInput } from '../schemas/project.schema';
import { formatActionError } from './action.util';
import type { ActionResult } from './action.types';

export const createProject = async (
  input: CreateProjectInput,
): Promise<ActionResult<{ id: string }>> => {
  const session = await auth();
  if (!session?.user?.id) redirect('/login');

  const now = new Date().toISOString();
  try {
    const project = await projectService.createProject({
      title: input.title,
      description: input.description,
      dueDate: input.dueDate.toISOString(),
      createdById: session.user.id,
      createdAt: now,
      updatedAt: now,
    });
    return { success: true, data: { id: project.id } };
  } catch (error) {
    return formatActionError(error);
  }
};

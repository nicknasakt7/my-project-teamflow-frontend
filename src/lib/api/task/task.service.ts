import { api } from '../client';
import type { Task } from './task.type';

type CreateTaskBody = {
  title: string;
  description?: string;
  priority: string;
  status: string;
  dueDate: string;
  isPersonal: boolean;
  assignToId?: string;
  projectId: string | null;
};

const createTask = (body: CreateTaskBody) =>
  api.post<Task>('/tasks', body);

export const taskService = { createTask };

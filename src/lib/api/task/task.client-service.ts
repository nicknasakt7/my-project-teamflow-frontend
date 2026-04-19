import { apiClient } from '../api-client';
import type { Task, TaskDetailResponse, TaskPriority, TaskStatus } from './task.type';

export type GetMyTasksParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
};

export type GetMyTasksResponse = {
  tasks: Task[];
  meta: { total: number; page: number; limit: number; totalPages: number };
};

const getMyTasks = (params: GetMyTasksParams = {}, token: string) =>
  apiClient.get<GetMyTasksResponse>('/tasks/my', params as Record<string, unknown>, token);

const getProjectTasks = (projectId: string, token: string) =>
  apiClient.get<GetMyTasksResponse>('/tasks', { projectId }, token);

const getTaskDetail = (taskId: string, token: string) =>
  apiClient.get<TaskDetailResponse>(`/tasks/${taskId}`, undefined, token);

const updateTaskStatus = (taskId: string, status: TaskStatus, token: string) =>
  apiClient.patch<TaskDetailResponse>(`/tasks/${taskId}/status`, { status }, token);

const getPersonalTasks = (params: GetMyTasksParams = {}, token: string) =>
  apiClient.get<GetMyTasksResponse>('/tasks/personal', params as Record<string, unknown>, token);

type CreatePersonalTaskPayload = {
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  isPersonal: true;
  assignToId?: string;
};

const createTask = (payload: CreatePersonalTaskPayload, token: string) =>
  apiClient.post<Task>('/tasks', payload, token);

const deleteTask = (taskId: string, token: string) =>
  apiClient.delete<void>(`/tasks/${taskId}`, token);

export const taskClientService = {
  getMyTasks,
  getProjectTasks,
  getTaskDetail,
  updateTaskStatus,
  getPersonalTasks,
  createTask,
  deleteTask,
};

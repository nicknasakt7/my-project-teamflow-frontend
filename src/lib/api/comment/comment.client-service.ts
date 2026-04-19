import { apiClient } from '../api-client';
import type { TaskComment } from '../task/task.type';

export type GetCommentsResponse = {
  data: TaskComment[];
  nextCursor: string | null;
};

const getComments = (taskId: string, token: string) =>
  apiClient.get<GetCommentsResponse>(`/tasks/${taskId}/comments`, { limit: 50 }, token);

const createComment = (taskId: string, content: string, token: string) =>
  apiClient.post<TaskComment>(`/tasks/${taskId}/comments`, { content }, token);

const updateComment = (commentId: string, content: string, token: string) =>
  apiClient.patch<TaskComment>(`/comments/${commentId}`, { content }, token);

const deleteComment = (commentId: string, token: string) =>
  apiClient.delete<void>(`/comments/${commentId}`, token);

export const commentClientService = { getComments, createComment, updateComment, deleteComment };

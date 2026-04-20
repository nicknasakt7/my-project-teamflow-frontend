import { apiClient } from '../api-client';
import type { Notification } from './notification.type';

const getMyNotifications = (token: string) =>
  apiClient.get<Notification[]>('/notifications', undefined, token);

const getUnreadCount = (token: string) =>
  apiClient.get<number>('/notifications/unread-count', undefined, token);

const markAsRead = (id: string, token: string) =>
  apiClient.patch<void>(`/notifications/${id}/read`, {}, token);

const markAllAsRead = (token: string) =>
  apiClient.patch<void>('/notifications/read-all', {}, token);

export const notificationClientService = {
  getMyNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
};

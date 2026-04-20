'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { notificationClientService } from '../notification.client-service';

export const useNotifications = () => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  return useQuery({
    queryKey: ['notifications'],
    queryFn: () => notificationClientService.getMyNotifications(token!),
    enabled: !!token,
    refetchInterval: 30_000,
  });
};

export const useUnreadCount = () => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  return useQuery({
    queryKey: ['notifications-unread-count'],
    queryFn: () => notificationClientService.getUnreadCount(token!),
    enabled: !!token,
    refetchInterval: 30_000,
  });
};

export const useMarkNotificationRead = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      notificationClientService.markAsRead(id, session?.user?.accessToken!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications-unread-count'] });
    },
  });
};

export const useMarkAllRead = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      notificationClientService.markAllAsRead(session?.user?.accessToken!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications-unread-count'] });
    },
  });
};

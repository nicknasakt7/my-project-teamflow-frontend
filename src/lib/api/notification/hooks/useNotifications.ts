'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { notificationClientService } from '../notification.client-service';

export const useNotifications = () => {
  const { data: session, status } = useSession();
  const token = session?.user?.accessToken;

  return useQuery({
    queryKey: ['notifications', session?.user?.id],
    queryFn: () => notificationClientService.getMyNotifications(token!),
    enabled: status === 'authenticated' && !!token,
    refetchInterval: 10_000,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};

export const useUnreadCount = () => {
  const { data: session, status } = useSession();
  const token = session?.user?.accessToken;

  return useQuery({
    queryKey: ['notifications-unread-count', session?.user?.id],
    queryFn: () => notificationClientService.getUnreadCount(token!),
    enabled: status === 'authenticated' && !!token,
    refetchInterval: 10_000,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
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

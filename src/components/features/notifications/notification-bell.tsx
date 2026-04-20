'use client';

import { Bell, CheckCheck, BellRing, ClipboardList } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  useNotifications,
  useUnreadCount,
  useMarkNotificationRead,
  useMarkAllRead,
} from '@/lib/api/notification/hooks/useNotifications';
import type { Notification } from '@/lib/api/notification/notification.type';

const typeIcon: Record<Notification['type'], React.ReactNode> = {
  TASK_ASSIGNED: <ClipboardList className="size-4 text-blue-500" />,
  TASK_COMMENT: <BellRing className="size-4 text-amber-500" />,
  COMMENT_REPLY: <BellRing className="size-4 text-emerald-500" />,
};

export default function NotificationBell() {
  const router = useRouter();
  const { data: notifications = [] } = useNotifications();
  const { data: unreadCount = 0 } = useUnreadCount();
  const { mutate: markRead } = useMarkNotificationRead();
  const { mutate: markAll, isPending } = useMarkAllRead();

  const handleClick = (n: Notification) => {
    if (!n.isRead) markRead(n.id);
    if (n.taskId) router.push(`/tasks/${n.taskId}`);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative p-5">
          <Bell className="size-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-80 p-0">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h3 className="font-semibold text-sm">Notifications</h3>
          {unreadCount > 0 && (
            <button
              onClick={() => markAll()}
              disabled={isPending}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
            >
              <CheckCheck className="size-3.5" />
              Mark all read
            </button>
          )}
        </div>

        {/* List */}
        <div className="max-h-[400px] overflow-y-auto divide-y">
          {notifications.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No notifications yet
            </p>
          ) : (
            notifications.map(n => (
              <button
                key={n.id}
                onClick={() => handleClick(n)}
                className={`w-full text-left px-4 py-3 flex gap-3 hover:bg-muted/50 transition-colors ${
                  !n.isRead ? 'bg-blue-50/60 dark:bg-blue-950/20' : ''
                }`}
              >
                <div className="mt-0.5 shrink-0">{typeIcon[n.type]}</div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${!n.isRead ? 'font-medium' : 'text-muted-foreground'}`}>
                    {n.title}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">{n.body}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })}
                  </p>
                </div>
                {!n.isRead && (
                  <span className="mt-1.5 shrink-0 w-2 h-2 rounded-full bg-blue-500" />
                )}
              </button>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

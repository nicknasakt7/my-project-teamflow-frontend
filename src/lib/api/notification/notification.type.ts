export type NotificationType = 'TASK_ASSIGNED' | 'TASK_COMMENT' | 'COMMENT_REPLY';

export type Notification = {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  taskId: string | null;
  task: { id: string; title: string } | null;
  isRead: boolean;
  createdAt: string;
};

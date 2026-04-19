export type TaskStatus =
  | 'TODO'
  | 'IN_PROGRESS'
  | 'IN_REVIEW'
  | 'DONE'
  | 'OVERDUE'
  | 'CANCELED';

export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export type Task = {
  id: string;
  title: string;
  description: string | null;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string | null;
  isPersonal: boolean;
  projectId: string | null;
  assignToId: string;
  createdById: string;
  createdAt: string;
  updatedAt: string;
  project?: { id: string; title: string } | null;
  assignTo?: { id: string; firstName: string; lastName: string };
  createdBy?: { id: string; firstName: string; lastName: string };
};

export type TaskComment = {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  user: { id: string; firstName: string; lastName: string };
};

export type TaskDetailResponse = Task & {
  comments?: TaskComment[];
};

export type ProjectStatus = 'ACTIVE' | 'COMPLETED' | 'OVERDUE' | 'CANCELED';

export type ProjectMember = {
  userId: string;
  user: {
    firstName: string;
    lastName: string;
    position: string;
    profileImageUrl: string | null;
  };
};

export type Project = {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  dueDate: string | null;
  projectMembers: ProjectMember[];
  _count: { tasks: number };
  createdById: string;
  createdBy: {
    firstName: string;
    lastName: string;
    position: string;
    profileImageUrl: string | null;
  };
  createdAt: string;
  updatedAt: string;
};

export type GetProjectsParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: ProjectStatus;
  createdBy?: string;
};

export type GetProjectsResponse = {
  projects: Project[];
  meta: { total: number; page: number; limit: number };
};

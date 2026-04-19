export type DashboardSummary = {
  totalWorkforce: number;
  activeMembers: number;
  inactiveMembers: number;
  activeProjects: number;
  completedProjects: number;
  overdueTasks: number;
};

export type SystemAlert = {
  type: 'WARNING' | 'DANGER' | 'INFO';
  message: string;
};

export type Activity = {
  id: string;
  message: string;
  createdAt: string;
};

export type DashboardSummaryResponse = {
  summary: DashboardSummary;
  alerts: SystemAlert[];
  activities: Activity[];
};

export type ProjectHealth = {
  projectId: string;
  projectTitle: string;
  dueDate: string | null;
  completedTask: number;
  totalTask: number;
  progressPercent: number;
  status: 'ON_TRACK' | 'DELAYED' | 'OVERDUE';
};

export type ProjectProgressResponse = {
  data: ProjectHealth[];
};

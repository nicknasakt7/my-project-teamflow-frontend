import { apiClient } from '../api-client';
import type { DashboardSummaryResponse, ProjectProgressResponse } from './dashboard.type';

const getSummary = (token: string) =>
  apiClient.get<DashboardSummaryResponse>('/dashboard/summary', undefined, token);

const getProjectProgress = (token: string) =>
  apiClient.get<ProjectProgressResponse>('/dashboard/project-progress', undefined, token);

export const dashboardClientService = { getSummary, getProjectProgress };

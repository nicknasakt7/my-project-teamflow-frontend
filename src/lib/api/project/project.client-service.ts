import { apiClient } from '../api-client';
import type { GetProjectsParams, GetProjectsResponse, Project } from './project.type';

const getProjects = (params: GetProjectsParams = {}, token: string) =>
  apiClient.get<GetProjectsResponse>('/projects', params as Record<string, unknown>, token);

const getProjectDetail = (projectId: string, token: string) =>
  apiClient.get<Project>(`/projects/${projectId}`, undefined, token);

const cancelProject = (projectId: string, token: string) =>
  apiClient.patch<Project>(`/projects/${projectId}/status`, {}, token);

const restoreProject = (projectId: string, token: string) =>
  apiClient.patch<Project>(`/projects/${projectId}/restore`, {}, token);

export const projectClientService = { getProjects, getProjectDetail, cancelProject, restoreProject };

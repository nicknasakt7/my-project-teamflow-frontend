import { api } from '../client';
import type { Project } from './project.type';

type CreateProjectBody = {
  title: string;
  description: string;
  dueDate: string;
  createdById: string;
};

const createProject = (body: CreateProjectBody) =>
  api.post<Project>('/projects', body);

const getProjectDetail = (projectId: string) =>
  api.get<Project>(`/projects/${projectId}`);

export const projectService = { createProject, getProjectDetail };

import { api } from '../client';
import type { Project } from './project.type';

type CreateProjectBody = {
  title: string;
  description: string;
  dueDate: string;
  createdById: string;
  createdAt: string;
  updatedAt: string;
};

const createProject = (body: CreateProjectBody) =>
  api.post<Project>('/projects', body);

export const projectService = { createProject };

export type TaskDetail = {
  id: string;
  title: string;
  description: string;

  status: 'TODO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';

  assignee: {
    name: string;
    role: string;
  };

  creator: {
    name: string;
    role: string;
  };

  dueDate: string;
  createdAt: string;

  projectName: string;

  comments: {
    id: string;
    name: string;
    message: string;
    createdAt: string;
  }[];
};

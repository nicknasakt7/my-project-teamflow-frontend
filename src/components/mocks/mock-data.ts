import { AlertTriangle, CheckCircle, Clock, Folder, Users } from 'lucide-react';
import { Member } from '../features/employees/team-member';
import { ProjectCardProps } from '../features/projects/project-card';
import { TaskItemProps } from '../features/tasks/task-item';

export const data = {
  summary: {
    totalWorkforce: 12,
    activeMembers: 10,
    inactiveMembers: 2,
    activeProjects: 5,
    completedProjects: 1,
    overdueTasks: 3,
  },

  activities: [
    {
      id: '1',
      message: 'Sarah Chen assigned task "Payment gateway integration"',
      createdAt: new Date(),
    },
    {
      id: '2',
      message: 'John Smith completed task "Authentication system"',
      createdAt: new Date(),
    },
  ],
};

export const summary = data.summary;
export const stats = [
  {
    title: 'Total Workforce',
    value: summary.totalWorkforce,
    description: '10 active members',
    icon: Users,
    bgColor: 'bg-blue-50',
  },
  {
    title: 'Active Members',
    value: summary.activeMembers,
    description: '83% of total workforce',
    icon: Users,
    bgColor: 'bg-green-50',
  },
  {
    title: 'On Leave / Inactive',
    value: summary.inactiveMembers,
    description: 'Members on leave or inactive',
    icon: Users,
    bgColor: 'bg-orange-50',
  },
  {
    title: 'Active Projects',
    value: summary.activeProjects,
    description: 'Projects currently running',
    icon: Folder,
    bgColor: 'bg-purple-50',
  },
  {
    title: 'Completed Projects',
    value: summary.completedProjects,
    description: 'Projects successfully delivered',
    icon: CheckCircle,
    bgColor: 'bg-teal-50',
  },
  {
    title: 'Overdue Tasks',
    value: summary.overdueTasks,
    description: 'Require immediate attention',
    icon: AlertTriangle,
    bgColor: 'bg-red-50',
  },
];

export const projects = [
  {
    id: '1',
    name: 'E-Commerce Platform Redesign',
    progress: 60,
    createdAt: '2026-03-01',
  },
  {
    id: '2',
    name: 'Mobile Banking App',
    progress: 40,
    createdAt: '2026-03-05',
  },
  {
    id: '3',
    name: 'Customer Portal',
    progress: 67,
    createdAt: '2026-03-10',
  },
];

export const mockProjects: ProjectCardProps[] = [
  {
    id: 1,
    name: 'Website Redesign',
    description: 'Complete overhaul of the company website',
    status: 'active',
    progress: 60,
    tasks: 12,
    dueDate: 'Mar 25, 2026',
    members: 3,
  },
  {
    id: 2,
    name: 'Mobile App Development',
    description: 'Build cross-platform mobile app',
    status: 'active',
    progress: 40,
    tasks: 24,
    dueDate: 'Apr 15, 2026',
    members: 4,
  },
  {
    id: 3,
    name: 'API Integration',
    description: 'Integrate third-party APIs',
    status: 'completed',
    progress: 100,
    tasks: 8,
    dueDate: 'Mar 10, 2026',
    members: 2,
  },
] as const;

export const members: Member[] = [
  {
    name: 'John Smith',
    role: 'Frontend Developer',
    initials: 'JS',
    color: 'bg-orange-500',
    tasks: 2,
  },
  {
    name: 'Maria Garcia',
    role: 'Backend Developer',
    initials: 'MG',
    color: 'bg-pink-500',
    tasks: 2,
  },
  {
    name: 'David Kim',
    role: 'Fullstack Developer',
    initials: 'DK',
    color: 'bg-teal-500',
    tasks: 0,
  },
  {
    name: 'Lisa Brown',
    role: 'UX/UI Designer',
    initials: 'LB',
    color: 'bg-yellow-500',
    tasks: 1,
  },
];

export const memberStats = [
  {
    title: 'Total Members',
    value: 12,
    icon: Users,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    title: 'Active',
    value: 9,
    icon: CheckCircle,
    color: 'bg-green-100 text-green-600',
  },
  {
    title: 'On Leave',
    value: 2,
    icon: Clock,
    color: 'bg-orange-100 text-orange-600',
  },
];

export const membersCard = [
  {
    id: '1',
    name: 'Sarah Chen',
    position: 'Product Manager',
    email: 'sarah@teamflow.com',
    projects: 5,
    tasks: 12,
  },
  {
    id: '2',
    name: 'John Smith',
    position: 'Frontend Developer',
    email: 'john@teamflow.com',
    projects: 3,
    tasks: 8,
  },
  {
    id: '3',
    name: 'Nick Nasa',
    position: 'Frontend Developer',
    email: 'nick@teamflow.com',
    projects: 3,
    tasks: 8,
  },
];

export const tasks: TaskItemProps[] = [
  {
    id: 1,
    title: 'Design landing page mockups',
    description: 'Create high-fidelity mockups for the new landing page',
    status: 'Todo',
    dueDate: 'Feb 10',
    priority: 'High',
    comments: 2,
  },
  {
    id: 2,
    title: 'Implement authentication system',
    description: 'Build secure JWT-based authentication with OAuth2',
    status: 'Done',
    dueDate: 'Feb 20',
    priority: 'High',
    comments: 1,
  },
  {
    id: 3,
    title: 'Product catalog REST API',
    description: 'Develop RESTful API endpoints for product catalog',
    status: 'In progress',
    dueDate: 'Mar 1',
    priority: 'Medium',
    comments: 0,
  },
  {
    id: 4,
    title: 'Product catalog REST API',
    description: 'Develop RESTful API endpoints for product catalog',
    status: 'In review',
    dueDate: 'Mar 1',
    priority: 'Medium',
    comments: 0,
  },
];

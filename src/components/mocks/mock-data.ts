import { AlertTriangle, CheckCircle, Clock, Folder, Users } from 'lucide-react';
import { Member } from '../features/employees/team-member';
import { ProjectCardProps } from '../features/projects/project-card';
import { TaskItemProps } from '../features/tasks/task-item';
import { MemberCardProps } from '../features/employees/member-card';
import { MyOwnTaskItemProps } from '../features/tasks/my-own-task-card';

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
    bgColor: 'bg-card',
  },
  {
    title: 'Active Members',
    value: summary.activeMembers,
    description: '83% of total workforce',
    icon: Users,
    bgColor: 'bg-card',
  },
  {
    title: 'On Leave / Inactive',
    value: summary.inactiveMembers,
    description: 'Members on leave or inactive',
    icon: Users,
    bgColor: 'bg-card',
  },
  {
    title: 'Active Projects',
    value: summary.activeProjects,
    description: 'Projects currently running',
    icon: Folder,
    bgColor: 'bg-card',
  },
  {
    title: 'Completed Projects',
    value: summary.completedProjects,
    description: 'Projects successfully delivered',
    icon: CheckCircle,
    bgColor: 'bg-card',
  },
  {
    title: 'Overdue Tasks',
    value: summary.overdueTasks,
    description: 'Require immediate attention',
    icon: AlertTriangle,
    bgColor: 'bg-card',
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
  {
    id: '4',
    name: 'Customer Portal2',
    progress: 45,
    createdAt: '2026-03-15',
  },
];

export const mockProjects: ProjectCardProps[] = [
  {
    id: 1,
    title: 'Website Redesign',
    description: 'Complete overhaul of the company website',
    status: 'Active',
    progress: 60,
    tasks: 12,
    dueDate: 'Mar 25, 2026',
    members: 3,
  },
  {
    id: 2,
    title: 'Mobile App Development',
    description: 'Build cross-platform mobile app',
    status: 'Active',
    progress: 40,
    tasks: 24,
    dueDate: 'Apr 15, 2026',
    members: 4,
  },
  {
    id: 3,
    title: 'API Integration',
    description: 'Integrate third-party APIs',
    status: 'Completed',
    progress: 100,
    tasks: 8,
    dueDate: 'Mar 10, 2026',
    members: 2,
  },
  {
    id: 4,
    title: 'API Integration2',
    description: 'Integrate third-party APIs2',
    status: 'Completed',
    progress: 100,
    tasks: 8,
    dueDate: 'Mar 15, 2026',
    members: 2,
  },
  {
    id: 5,
    title: 'Marketing Website',
    description: 'Create landing pages and marketing content',
    status: 'Active',
    progress: 40,
    tasks: 10,
    dueDate: 'Apr 10, 2026',
    members: 3,
  },
  {
    id: 6,
    title: 'CRM System',
    description: 'Develop internal CRM for sales tracking',
    status: 'Active',
    progress: 25,
    tasks: 18,
    dueDate: 'May 5, 2026',
    members: 5,
  },
  {
    id: 7,
    title: 'Analytics Dashboard',
    description: 'Build analytics dashboard for product metrics',
    status: 'Active',
    progress: 55,
    tasks: 14,
    dueDate: 'Apr 20, 2026',
    members: 4,
  },
  {
    id: 8,
    title: 'Authentication Service',
    description: 'Implement OAuth and secure login system',
    status: 'Completed',
    progress: 100,
    tasks: 9,
    dueDate: 'Mar 5, 2026',
    members: 2,
  },
  {
    id: 9,
    title: 'Payment Gateway',
    description: 'Integrate Stripe and payment workflows',
    status: 'Active',
    progress: 65,
    tasks: 11,
    dueDate: 'Apr 18, 2026',
    members: 3,
  },
  {
    id: 10,
    title: 'Internal Admin Panel',
    description: 'Create admin tools for managing users and data',
    status: 'Canceled',
    progress: 10,
    tasks: 6,
    dueDate: 'Jun 1, 2026',
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

export const membersCard: MemberCardProps[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    position: 'Product Manager',
    email: 'sarah@teamflow.com',
    projects: 5,
    tasks: 12,
    status: 'Active',
  },
  {
    id: '2',
    name: 'John Smith',
    position: 'Frontend Developer',
    email: 'john@teamflow.com',
    projects: 3,
    tasks: 8,
    status: 'In active',
  },
  {
    id: '3',
    name: 'Nick Nasa',
    position: 'Frontend Developer',
    email: 'nick@teamflow.com',
    projects: 3,
    tasks: 8,
    status: 'Active',
  },
  {
    id: '4',
    name: 'David Kim',
    position: 'Fullstack Developer',
    email: 'david@teamflow.com',
    projects: 2,
    tasks: 3,
    status: 'On Leave',
  },
  {
    id: '5',
    name: 'Lisa Brown',
    position: 'UX/UI Designer',
    email: 'lisa@teamflow.com',
    projects: 6,
    tasks: 10,
    status: 'Active',
  },
  {
    id: '6',
    name: 'Michael Johnson',
    position: 'DevOps Engineer',
    email: 'michael@teamflow.com',
    projects: 3,
    tasks: 7,
    status: 'Active',
  },
  {
    id: '7',
    name: 'Emily Davis',
    position: 'QA Engineer',
    email: 'emily@teamflow.com',
    projects: 4,
    tasks: 11,
    status: 'Active',
  },
  {
    id: '8',
    name: 'James Wilson',
    position: 'Database Administrator',
    email: 'james@teamflow.com',
    projects: 0,
    tasks: 0,
    status: 'In active',
  },
  {
    id: '9',
    name: 'Anna Lee',
    position: 'Project Manager',
    email: 'anna@teamflow.com',
    projects: 3,
    tasks: 9,
    status: 'Active',
  },
  {
    id: '10',
    name: 'Tom Harris',
    position: 'Scrum Master',
    email: 'tom@teamflow.com',
    projects: 2,
    tasks: 5,
    status: 'Active',
  },
  {
    id: '11',
    name: 'Rachel Kim',
    position: 'UX Designer',
    email: 'rachel@teamflow.com',
    projects: 1,
    tasks: 2,
    status: 'On Leave',
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

export const myTasks = [
  {
    id: '5',
    title: 'React Advanced Patterns',
    description: 'Study render props and compound components',
    dueDate: '4/15/2024',
    priority: 'Medium',
    status: 'In progress',
  },
  {
    id: '6',
    title: 'Portfolio Website Update',
    description: 'Update personal portfolio with latest projects',
    dueDate: '4/20/2024',
    priority: 'Low',
    status: 'Todo',
  },
  {
    id: '7',
    title: 'TypeScript Deep Dive',
    description: 'Practice advanced TypeScript generics',
    dueDate: '4/25/2024',
    priority: 'Medium',
    status: 'In progress',
  },
  {
    id: '8',
    title: 'Next.js SEO Optimization',
    description: 'Implement metadata and structured data',
    dueDate: '4/28/2024',
    priority: 'Low',
    status: 'Todo',
  },
];

export const myOwnTasks: MyOwnTaskItemProps[] = [
  {
    id: '1',
    title: 'Personal Learning - React Advanced Patterns',
    description:
      'Study and practice advanced React patterns including render props and compound components',
    dueDate: 'Apr 15, 2026',
    priority: 'Medium',
    status: 'In progress',
  },
  {
    id: '2',
    title: 'Portfolio Website Update',
    description:
      'Update personal portfolio with latest projects and technologies',
    dueDate: 'Apr 20, 2026',
    priority: 'Low',
    status: 'Todo',
  },
];

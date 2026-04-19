import { AlertTriangle, CheckCircle, Clock, Folder, Users } from 'lucide-react';
import StatsCard from './stats-card';
import type { DashboardSummary } from '@/lib/api/dashboard/dashboard.type';

type StatCardListProps = {
  summary: DashboardSummary;
};

export default function StatCardList({ summary }: StatCardListProps) {
  const stats = [
    {
      title: 'Total Workforce',
      value: summary.totalWorkforce,
      description: `${summary.activeMembers} active members`,
      icon: Users,
      borderColor: 'border-l-blue-400',
      iconColor: 'text-blue-400',
    },
    {
      title: 'Active Members',
      value: summary.activeMembers,
      description: `${Math.round((summary.activeMembers / summary.totalWorkforce) * 100)}% of total workforce`,
      icon: Users,
      borderColor: 'border-l-emerald-400',
      iconColor: 'text-emerald-400',
    },
    {
      title: 'On Leave / Inactive',
      value: summary.inactiveMembers,
      description: 'Members on leave or inactive',
      icon: Clock,
      borderColor: 'border-l-amber-400',
      iconColor: 'text-amber-400',
    },
    {
      title: 'Active Projects',
      value: summary.activeProjects,
      description: 'Projects currently running',
      icon: Folder,
      borderColor: 'border-l-violet-400',
      iconColor: 'text-violet-400',
    },
    {
      title: 'Completed Projects',
      value: summary.completedProjects,
      description: 'Projects successfully delivered',
      icon: CheckCircle,
      borderColor: 'border-l-teal-400',
      iconColor: 'text-teal-400',
    },
    {
      title: 'Overdue Tasks',
      value: summary.overdueTasks,
      description: 'Require immediate attention',
      icon: AlertTriangle,
      borderColor: 'border-l-red-400',
      iconColor: 'text-red-400',
    },
  ];

  return (
    <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
      {stats.map(stat => (
        <StatsCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}

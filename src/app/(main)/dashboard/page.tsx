import ActiveProjectHealth from '@/components/features/dashboard/active-project-health';
import ActivityStream from '@/components/features/dashboard/activity-stream';

import QuickOperations from '@/components/features/dashboard/quick-operations';
import StatsCard from '@/components/features/dashboard/stats-card';
import { data, stats } from '@/components/mocks/mock-data';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map(stat => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Main Dashboard Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2">
          <ActiveProjectHealth />
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          {/* QuickOperations */}
          <QuickOperations />
          {/* ActivityStream */}
          <ActivityStream activities={data.activities} />
        </div>
      </div>
    </div>
  );
}

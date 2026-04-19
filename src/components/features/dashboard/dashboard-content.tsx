'use client';

import { useDashboardSummary } from '@/lib/api/dashboard/hooks/useDashboardSummary';
import StatCardList from './stat-card-list';
import ActiveProjectHealth from './active-project-health';
import ActivityStream from './activity-stream';
import QuickOperations from './quick-operations';

export default function DashboardContent() {
  const { data, isLoading } = useDashboardSummary();

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      {isLoading || !data ? (
        <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-32 rounded-xl bg-card animate-pulse" />
          ))}
        </div>
      ) : (
        <StatCardList summary={data.summary} />
      )}

      {/* Main Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ActiveProjectHealth />
        </div>

        <div className="space-y-6">
          <QuickOperations />
          <ActivityStream activities={data?.activities ?? []} />
        </div>
      </div>
    </div>
  );
}

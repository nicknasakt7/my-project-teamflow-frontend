import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import ActivityItem from './activity-item';

import type { Activity } from '@/lib/api/dashboard/dashboard.type';

type ActivityStreamProps = {
  activities: Activity[];
};

export default function ActivityStream({ activities }: ActivityStreamProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Activity Stream</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {activities.map(activity => (
          <ActivityItem
            key={activity.id}
            message={activity.message}
            createdAt={activity.createdAt}
          />
        ))}
      </CardContent>
    </Card>
  );
}

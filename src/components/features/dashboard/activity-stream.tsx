import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import ActivityItem from './activity-item';

type Activity = {
  id: string;
  message: string;
  createdAt: Date;
};

type Props = {
  activities: Activity[];
};

export default function ActivityStream({ activities }: Props) {
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

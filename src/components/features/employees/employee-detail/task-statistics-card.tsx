import { Card, CardContent } from '@/components/ui/card';
import StatBox from './stat-box';

export default function TaskStatisticsCard() {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <h3 className="font-semibold text-xl">Task Statistics</h3>

        <div className="grid grid-cols-4 gap-4 text-card">
          <StatBox title="Total" value={24} />
          <StatBox title="Completed" value={18} />
          <StatBox title="In Progress" value={4} />
          <StatBox title="Pending" value={2} />
        </div>

        <div>
          <p className="text-md mb-1">Completion Rate</p>
          <div className="w-full h-2 bg-muted rounded">
            <div className="w-[75%] h-2 bg-black rounded"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

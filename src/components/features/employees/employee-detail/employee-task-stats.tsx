'use client';

import { Card, CardContent } from '@/components/ui/card';
import type { EmployeeSummary } from '@/lib/api/employee/hooks/useEmployeeSummary';

type Props = { taskStats: EmployeeSummary['taskStats'] };

const stats = [
  { key: 'total' as const, label: 'Total', color: 'bg-primary text-primary-foreground' },
  { key: 'done' as const, label: 'Completed', color: 'bg-emerald-500 text-white' },
  { key: 'inProgress' as const, label: 'In Progress', color: 'bg-blue-500 text-white' },
  { key: 'inReview' as const, label: 'In Review', color: 'bg-amber-500 text-white' },
  { key: 'todo' as const, label: 'Todo', color: 'bg-slate-400 text-white' },
  { key: 'overdue' as const, label: 'Overdue', color: 'bg-red-500 text-white' },
];

export default function EmployeeTaskStats({ taskStats }: Props) {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <h3 className="font-semibold text-lg">Task Statistics</h3>

        <div className="grid grid-cols-3 gap-3">
          {stats.map(s => (
            <div key={s.key} className={`p-4 rounded-lg text-center ${s.color}`}>
              <p className="text-2xl font-bold">{taskStats[s.key]}</p>
              <p className="text-xs mt-0.5 opacity-90">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Completion Rate</span>
            <span className="font-medium">{taskStats.completionRate}%</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-2 bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${taskStats.completionRate}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

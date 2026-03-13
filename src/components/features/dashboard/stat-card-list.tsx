import { stats } from '@/components/mocks/mock-data';
import StatsCard from './stats-card';

export default function StatCardList() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map(stat => (
        <StatsCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          description={stat.description}
          icon={stat.icon}
          bgColor={stat.bgColor}
        />
      ))}
    </div>
  );
}

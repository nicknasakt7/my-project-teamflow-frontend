import { memberStats } from '@/components/mocks/mock-data';
import { Card, CardContent } from '@/components/ui/card';

export default function MemberStats() {
  return (
    <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-4">
      {memberStats.map(stat => {
        const Icon = stat.icon;

        return (
          <Card key={stat.title}>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-md text-muted-foreground">{stat.title}</p>

                <p className="text-3xl font-semibold">{stat.value}</p>
              </div>

              <div className={`${stat.color} p-3 rounded-full`}>
                <Icon className="size-8" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

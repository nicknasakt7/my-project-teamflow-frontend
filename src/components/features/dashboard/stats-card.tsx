import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

type StatsCardProps = {
  title: string;
  value: number;
  description: string;
  icon: LucideIcon;
  bgColor: string;
};
export default function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  bgColor,
}: StatsCardProps) {
  return (
    <Card className={bgColor}>
      <CardContent className="flex items-start justify-between p-2 ml-4 mr-4">
        <div className="space-y-2">
          <p className="text-xl font-semibold text-muted-foreground">{title}</p>

          <p className="text-4xl font-bold">{value}</p>

          <p className="text-md font-medium text-primary">{description}</p>
        </div>
        <Icon className="size-10 text-chart-2" />
      </CardContent>
    </Card>
  );
}

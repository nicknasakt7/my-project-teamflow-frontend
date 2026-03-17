import { Card, CardContent } from '@/components/ui/card';

export default function ActiveProjectSummary() {
  return (
    <Card>
      <CardContent className="p-5">
        <p className="text-xl font-bold">2</p>
        <p className="text-sm text-muted-foreground">Active Projects</p>

        <p className="text-xs mt-2 text-muted-foreground">
          Contributing to 2 projects with 24 total tasks assigned
        </p>
      </CardContent>
    </Card>
  );
}

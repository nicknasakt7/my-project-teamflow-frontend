import { Card, CardContent } from '@/components/ui/card';
import ProjectItem from './project-item';

export default function ActiveProjectList() {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <h3 className="font-semibold">Active Projects</h3>

        <ProjectItem
          title="E-Commerce Platform Redesign"
          progress={60}
          status="On Track"
        />

        <ProjectItem
          title="Mobile Banking App"
          progress={40}
          status="At Risk"
        />
      </CardContent>
    </Card>
  );
}

import { Progress } from '@/components/ui/progress';

export default function ProjectProgress() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between text-md">
        <span>Overall Progress</span>
        <span>60%</span>
      </div>

      <Progress value={60} />
    </div>
  );
}

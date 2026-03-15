import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

type CreateMyTaskButtonProps = {
  onClick: () => void;
};

export default function CreateMyTaskButton({
  onClick,
}: CreateMyTaskButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="flex w-full items-center justify-center gap-2 rounded-lg h-12 text-card text-xl font-bold"
    >
      <Plus /> Create My Task
    </Button>
  );
}

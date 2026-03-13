import { Card, CardContent } from '@/components/ui/card';
import { Mail } from 'lucide-react';
import Image from 'next/image';

export type MemberCardProps = {
  name: string;
  position: string;
  email: string;
  projects: number;
  tasks: number;
};

export default function MemberCard({
  name,
  position,
  email,
  projects,
  tasks,
}: MemberCardProps) {
  return (
    <Card>
      <CardContent className="p-5 space-y-4">
        <div>
          <Image src="/logo.png" alt="image" width={60} height={60} />
        </div>
        <div className="flex gap-6">
          <p className="font-semibold text-xl">{name}</p>
        </div>
        <p className="text-sm text-muted-foreground">{position}</p>

        <div className="text-sm space-y-1 text-muted-foreground">
          <div className="flex items-center gap-2">
            <Mail className="size-4" />
            {email}
          </div>
        </div>

        <div className="flex justify-between border-t pt-3">
          <div className="flex flex-col items-center justify-center">
            <p className="font-semibold">{projects}</p>
            <p className="text-sm text-muted-foreground">Projects</p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <p className="font-semibold">{tasks}</p>
            <p className="text-sm text-muted-foreground">Tasks</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

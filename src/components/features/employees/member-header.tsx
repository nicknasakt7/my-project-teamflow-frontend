import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function MemberHeader() {
  return (
    <div className="flex justify-between items-center">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Team Members</h1>

        <p className="text-xl text-muted-foreground">
          Manage and view all team members
        </p>
      </div>

      <Button asChild>
        <Link href="/employees/create" className="text-xl font-semibold">
          <Plus className="size-5" /> Add Member
        </Link>
      </Button>
    </div>
  );
}

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function MemberHeader() {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-semibold">Team Members</h1>

        <p className="text-lg text-muted-foreground">
          Manage and view all team members
        </p>
      </div>

      <Button asChild>
        <Link href="/employees/create" className="text-xl">
          <Plus className="size-5" /> Add Member
        </Link>
      </Button>
    </div>
  );
}

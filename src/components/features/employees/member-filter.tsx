import { membersCard } from '@/components/mocks/mock-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Filter, Search } from 'lucide-react';

export default function MemberFilter() {
  return (
    <>
      <div className="flex gap-4 items-center">
        {/* SEARCH */}
        <div className="relative flex-1 w-105">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
          <Input
            placeholder="Search by name, last name, or email..."
            className="pl-9 placeholder:text-lg"
          />
        </div>

        {/* POSITION FILTER */}
        <Button variant="outline" className="text-md">
          <Filter className="size-5 mr-2" />
          Position: All
        </Button>

        {/* STATUS FILTER */}
        <Button variant="outline" className="text-md">
          <Filter className="size-5 mr-2 " />
          Status: All
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        Showing {membersCard.length} of {membersCard.length} members
      </p>
    </>
  );
}

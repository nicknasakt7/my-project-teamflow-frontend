import { membersCard } from '@/components/mocks/mock-data';
import PositionFilter from '@/components/shared/position-filter';
import SearchInput from '@/components/shared/search-input';
import StatusFilter from '@/components/shared/status-filter';

export default function MemberFilter() {
  return (
    <>
      <div className="flex gap-4 items-center">
        {/* SEARCH */}
        <SearchInput />

        {/* POSITION FILTER */}
        <PositionFilter />

        {/* STATUS FILTER */}
        <StatusFilter />
      </div>
      <p className="text-sm text-muted-foreground">
        Showing {membersCard.length} of {membersCard.length} members
      </p>
    </>
  );
}

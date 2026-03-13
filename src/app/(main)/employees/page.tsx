import MemberCard from '@/components/features/employees/member-card';
import MemberFilter from '@/components/features/employees/member-filter';
import MemberHeader from '@/components/features/employees/member-header';
import MemberStats from '@/components/features/employees/member-stat';
import { membersCard } from '@/components/mocks/mock-data';

export default function MemberPage() {
  return (
    <>
      <div className="p-6 space-y-6 ">
        <MemberHeader />
        <MemberStats />
        <MemberFilter />
      </div>
      <div className="grid gap-4.5 px-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {membersCard.map(memberCard => (
          <MemberCard key={memberCard.id} {...memberCard} />
        ))}
      </div>
    </>
  );
}

import ActiveProjectList from '@/components/features/employees/employee-detail/active-project-list';
import ProfileCard from '@/components/features/employees/employee-detail/profile-card';
import TaskStatisticsCard from '@/components/features/employees/employee-detail/task-statistics-card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function MemberDetail() {
  return (
    <div className="p-6 space-y-6">
      <Link
        href="/employees"
        className="gap-4 text-md font-semibold text-muted-foreground flex justify-start items-center pl-2 hover:bg-accent w-60 h-8 rounded-xl"
      >
        <ArrowLeft />
        Back to Members
      </Link>

      <ProfileCard />
      <div className="grid grid-cols-3 gap-6">
        {/* ซ้าย */}
        <div className="col-span-2 space-y-6">
          <TaskStatisticsCard />
          <ActiveProjectList />
        </div>

        {/* ขวา */}
        <div>{/* <ActiveProjectsSummary /> */}</div>
      </div>
    </div>
  );
}

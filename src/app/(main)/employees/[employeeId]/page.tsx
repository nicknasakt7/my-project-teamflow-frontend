'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useEmployeeSummary } from '@/lib/api/employee/hooks/useEmployeeSummary';
import EmployeeProfileCard from '@/components/features/employees/employee-detail/employee-profile-card';
import EmployeeTaskStats from '@/components/features/employees/employee-detail/employee-task-stats';
import EmployeeProjectList from '@/components/features/employees/employee-detail/employee-project-list';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default function EmployeeDetailPage({
  params,
}: {
  params: Promise<{ employeeId: string }>;
}) {
  const { employeeId } = use(params);

  if (!UUID_REGEX.test(employeeId)) notFound();

  const { data, isLoading } = useEmployeeSummary(employeeId);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500 ease-out">
      <Link
        href="/employees"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-4" />
        Back to Members
      </Link>

      {isLoading ? (
        <div className="space-y-6">
          <div className="h-40 rounded-xl bg-muted/40 animate-pulse" />
          <div className="h-36 rounded-xl bg-muted/40 animate-pulse" />
          <div className="h-48 rounded-xl bg-muted/40 animate-pulse" />
        </div>
      ) : data ? (
        <>
          <EmployeeProfileCard employee={data.employee} />
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              <EmployeeTaskStats taskStats={data.taskStats} />
              <EmployeeProjectList projects={data.projects} />
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

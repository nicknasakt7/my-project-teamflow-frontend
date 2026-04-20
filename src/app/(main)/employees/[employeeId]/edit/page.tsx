'use client';

import { use } from 'react';
import { notFound, redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEmployeeSummary } from '@/lib/api/employee/hooks/useEmployeeSummary';
import EditMemberForm from '@/components/features/employees/employee-detail/edit-member-form';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default function EditMemberPage({
  params,
}: {
  params: Promise<{ employeeId: string }>;
}) {
  const { employeeId } = use(params);
  const { data: session } = useSession();

  if (!UUID_REGEX.test(employeeId)) notFound();

  const role = session?.user?.roleType;

  if (role && role !== 'ADMIN' && role !== 'SUPER_ADMIN') {
    redirect(`/employees/${employeeId}`);
  }

  const { data, isLoading } = useEmployeeSummary(employeeId);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-40 rounded bg-muted/40 animate-pulse" />
        <div className="h-[500px] rounded-xl bg-muted/40 animate-pulse" />
      </div>
    );
  }

  if (!data) return notFound();

  if (role === 'ADMIN' && data.employee.roleType !== 'EMPLOYEE') {
    redirect(`/employees/${employeeId}`);
  }

  return <EditMemberForm employee={data.employee} />;
}

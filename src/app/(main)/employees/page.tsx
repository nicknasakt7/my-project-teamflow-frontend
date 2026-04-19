'use client';

import { useState } from 'react';
import { useEmployees } from '@/lib/api/employee/hooks/useEmployees';
import { useDebounce } from '@/lib/hooks/useDebounce';
import MemberHeader from '@/components/features/employees/member-header';
import EmployeeList from '@/components/features/employees/employee-list';
import EmployeeFilter from '@/components/features/employees/employee-filter';
import type { RoleType, Status, Position, Level } from '@/lib/api/user/user.type';

const LIMIT = 12;

export default function MemberPage() {
  const [search, setSearch] = useState('');
  const [role, setRole] = useState<RoleType | ''>('');
  const [status, setStatus] = useState<Status | ''>('');
  const [position, setPosition] = useState<Position | ''>('');
  const [level, setLevel] = useState<Level | ''>('');
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 400);

  const { data, isLoading } = useEmployees({
    search: debouncedSearch || undefined,
    role: role || undefined,
    status: status || undefined,
    position: position || undefined,
    level: level || undefined,
    page,
    limit: LIMIT,
  });

  const employees = data?.employees ?? [];
  const total = data?.meta.total ?? 0;
  const totalPages = Math.ceil(total / LIMIT);

  const handleSearch = (value: string) => { setSearch(value); setPage(1); };
  const handleRole = (value: RoleType | '') => { setRole(value); setPage(1); };
  const handleStatus = (value: Status | '') => { setStatus(value); setPage(1); };
  const handlePosition = (value: Position | '') => { setPosition(value); setPage(1); };
  const handleLevel = (value: Level | '') => { setLevel(value); setPage(1); };

  return (
    <div className="p-6 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500 ease-out">
      <MemberHeader />

      <EmployeeFilter
        search={search}
        role={role}
        status={status}
        position={position}
        level={level}
        total={total}
        shown={employees.length}
        onSearch={handleSearch}
        onRole={handleRole}
        onStatus={handleStatus}
        onPosition={handlePosition}
        onLevel={handleLevel}
      />

      <EmployeeList
        employees={employees}
        isLoading={isLoading}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}

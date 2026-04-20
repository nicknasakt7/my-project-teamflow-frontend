'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { User, Status } from '@/lib/api/user/user.type';
import { allPositions } from '@/constants/positions';

const statusStyles: Record<Status, string> = {
  ACTIVE:
    'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  INACTIVE: 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400',
  LEAVE: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
};

const statusLabel: Record<Status, string> = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  LEAVE: 'On Leave',
};

const positionLabel = (pos: string) =>
  allPositions.find(p => p.value === pos)?.label ?? pos;

function getInitials(firstName: string, lastName: string) {
  return `${firstName[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase();
}

type EmployeeListProps = {
  employees: User[];
  isLoading: boolean;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function EmployeeList({
  employees,
  isLoading,
  page,
  totalPages,
  onPageChange,
}: EmployeeListProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-44 rounded-xl bg-muted/40 animate-pulse" />
        ))}
      </div>
    );
  }

  if (employees.length === 0) {
    return (
      <div className="bg-card border border-border rounded-xl p-16 text-center text-sm text-muted-foreground">
        No members found
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {employees.map(emp => (
          <Link key={emp.id} href={`/employees/${emp.id}?page=${page}`}>
            <div className="border rounded-xl p-5 flex flex-col gap-4 bg-card hover:shadow-md hover:border-primary/40 transition-all">
              <div className="flex justify-between items-start gap-2">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {emp.profileImageUrl ? (
                    <Image
                      src={emp.profileImageUrl}
                      alt={`${emp.firstName} ${emp.lastName}`}
                      width={80}
                      height={80}
                      className="w-16 h-16 rounded-full object-cover shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm shrink-0">
                      {getInitials(emp.firstName, emp.lastName)}
                    </div>
                  )}
                  <div className="min-w-0">
                    <h3 className="font-semibold truncate">
                      {emp.firstName} {emp.lastName}
                    </h3>
                    <p className="text-xs text-muted-foreground truncate">
                      {positionLabel(emp.position)}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full shrink-0 font-medium ${statusStyles[emp.status]}`}
                >
                  {statusLabel[emp.status]}
                </span>
              </div>

              <p className="flex items-center gap-2 text-xs text-muted-foreground truncate">
                <Mail className="size-3.5 shrink-0" />
                {emp.email}
              </p>

              <div className="border-t pt-3 flex justify-between text-center text-xs text-muted-foreground">
                <div className="flex-1">
                  <p className="font-semibold text-sm text-foreground">
                    {emp.level}
                  </p>
                  <p>Level</p>
                </div>
                <div className="w-px bg-border" />
                <div className="flex-1">
                  <p className="font-semibold text-sm text-foreground">
                    {emp.roleType.replace('_', ' ')}
                  </p>
                  <p>Role</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-end gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <span className="text-sm">
            Page {page} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

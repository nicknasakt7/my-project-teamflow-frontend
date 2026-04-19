'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { allPositions } from '@/constants/positions';
import type { RoleType, Status, Position, Level } from '@/lib/api/user/user.type';

type EmployeeFilterProps = {
  search: string;
  role: RoleType | '';
  status: Status | '';
  position: Position | '';
  level: Level | '';
  total: number;
  shown: number;
  onSearch: (v: string) => void;
  onRole: (v: RoleType | '') => void;
  onStatus: (v: Status | '') => void;
  onPosition: (v: Position | '') => void;
  onLevel: (v: Level | '') => void;
};

export default function EmployeeFilter({
  search,
  role,
  status,
  position,
  level,
  total,
  shown,
  onSearch,
  onRole,
  onStatus,
  onPosition,
  onLevel,
}: EmployeeFilterProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-3 items-center bg-card/80 border px-6 py-4 rounded-lg">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            className="pl-9"
            value={search}
            onChange={e => onSearch(e.target.value)}
          />
        </div>

        <Select
          value={role || '_all'}
          onValueChange={v => onRole(v === '_all' ? '' : v as RoleType)}
        >
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="_all">All Roles</SelectItem>
            <SelectItem value="EMPLOYEE">Employee</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
            <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={status || '_all'}
          onValueChange={v => onStatus(v === '_all' ? '' : v as Status)}
        >
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="_all">All Status</SelectItem>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="INACTIVE">Inactive</SelectItem>
            <SelectItem value="LEAVE">On Leave</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={level || '_all'}
          onValueChange={v => onLevel(v === '_all' ? '' : v as Level)}
        >
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="_all">All Levels</SelectItem>
            <SelectItem value="JUNIOR">Junior</SelectItem>
            <SelectItem value="MID">Mid</SelectItem>
            <SelectItem value="SENIOR">Senior</SelectItem>
            <SelectItem value="LEAD">Lead</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={position || '_all'}
          onValueChange={v => onPosition(v === '_all' ? '' : v as Position)}
        >
          <SelectTrigger className="w-52">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="_all">All Positions</SelectItem>
            {allPositions.map(p => (
              <SelectItem key={p.value} value={p.value}>
                {p.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <p className="text-sm text-muted-foreground">
        Showing <span className="font-medium text-foreground">{shown}</span> of{' '}
        <span className="font-medium text-foreground">{total}</span> members
      </p>
    </div>
  );
}

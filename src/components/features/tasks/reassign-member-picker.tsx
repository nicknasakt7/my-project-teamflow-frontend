'use client';

import { useMemo, useState } from 'react';
import { Search, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useEmployees } from '@/lib/api/employee/hooks/useEmployees';
import { positions, positionLabels } from '@/constants/positions';
import type { User } from '@/lib/api/user/user.type';

type Props = {
  excludeId?: string;
  selectedId: string;
  onSelect: (id: string) => void;
  isPending?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  taskTitle: string;
};

export default function ReassignMemberPicker({
  excludeId,
  selectedId,
  onSelect,
  isPending,
  onConfirm,
  onCancel,
  taskTitle,
}: Props) {
  const [search, setSearch] = useState('');
  const [positionFilter, setPositionFilter] = useState('ALL');

  const { data } = useEmployees({ role: 'EMPLOYEE', status: 'ACTIVE', limit: 100 });

  const filtered = useMemo(() => {
    return (data?.employees ?? []).filter((e: User) => {
      if (e.id === excludeId) return false;
      if (positionFilter !== 'ALL' && e.position !== positionFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const full = `${e.firstName} ${e.lastName}`.toLowerCase();
        if (!full.includes(q)) return false;
      }
      return true;
    });
  }, [data, excludeId, search, positionFilter]);

  return (
    <div className="space-y-4 pt-1">
      <p className="text-sm text-muted-foreground">
        <span className="font-medium text-foreground">{taskTitle}</span>
        {' '}will be reassigned to:
      </p>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
        <Input
          placeholder="Search member..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-8"
        />
      </div>

      {/* Position filter */}
      <Select value={positionFilter} onValueChange={setPositionFilter}>
        <SelectTrigger>
          <SelectValue placeholder="Filter by position" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All positions</SelectItem>
          {positions.map(p => (
            <SelectItem key={p} value={p}>
              {positionLabels[p]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Member list */}
      <div className="max-h-52 overflow-y-auto space-y-1 rounded-md border p-1">
        {filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">No members found</p>
        ) : (
          filtered.map((e: User) => {
            const initials = `${e.firstName[0]}${e.lastName[0]}`;
            const isSelected = selectedId === e.id;
            return (
              <button
                key={e.id}
                type="button"
                onClick={() => onSelect(e.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors ${
                  isSelected
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                <Avatar className="size-7 shrink-0">
                  <AvatarFallback className={`text-xs font-bold ${isSelected ? 'bg-primary-foreground text-primary' : 'bg-primary/10 text-primary'}`}>
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {e.firstName} {e.lastName}
                  </p>
                  <p className={`text-xs truncate ${isSelected ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                    {positionLabels[e.position] ?? e.position}
                  </p>
                </div>
                {isSelected && <Check className="size-4 shrink-0" />}
              </button>
            );
          })
        )}
      </div>

      <div className="flex justify-end gap-2 pt-1">
        <Button variant="outline" onClick={onCancel} disabled={isPending}>
          Cancel
        </Button>
        <Button onClick={onConfirm} disabled={!selectedId || isPending}>
          {isPending ? 'Reassigning...' : 'Confirm'}
        </Button>
      </div>
    </div>
  );
}

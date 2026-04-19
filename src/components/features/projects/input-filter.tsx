'use client';

import SearchInput from '@/components/shared/search-input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { ProjectStatus } from '@/lib/api/project/project.type';

type InputFilterProps = {
  onSearch: (value: string) => void;
  onStatusChange: (value: ProjectStatus | undefined) => void;
};

export default function InputFilter({ onSearch, onStatusChange }: InputFilterProps) {
  return (
    <div className="flex gap-4 bg-card/80 border px-8 py-4 rounded-lg">
      <SearchInput placeholder="Search projects..." onChange={onSearch} />

      <Select
        defaultValue="ALL"
        onValueChange={val => onStatusChange(val === 'ALL' ? undefined : (val as ProjectStatus))}
      >
        <SelectTrigger className="w-60 p-4 text-md">
          <SelectValue placeholder="Status: All" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All</SelectItem>
          <SelectItem value="ACTIVE">Active</SelectItem>
          <SelectItem value="COMPLETED">Completed</SelectItem>
          <SelectItem value="OVERDUE">Overdue</SelectItem>
          <SelectItem value="CANCELED">Canceled</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

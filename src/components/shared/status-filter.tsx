'use client';

import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Filter } from 'lucide-react';

export default function StatusFilter() {
  const [status, setStatus] = useState('All');
  return (
    <Select value={status} onValueChange={setStatus}>
      <SelectTrigger className="w-45 flex items-center gap-2 text-md font-medium">
        <Filter className="size-5" />
        Status: <SelectValue placeholder="All" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="All">All</SelectItem>
        <SelectItem value="Active">Active</SelectItem>
        <SelectItem value="In progress">In progress</SelectItem>
        <SelectItem value="In review">In review</SelectItem>
        <SelectItem value="Done">Done</SelectItem>
        <SelectItem value="Canceled">Canceled</SelectItem>
      </SelectContent>
    </Select>
  );
}

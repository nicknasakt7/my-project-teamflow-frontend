'use client';
import { Filter } from 'lucide-react';

import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { allPositions } from '@/constants/positions';

export default function PositionFilter() {
  const [position, setPosition] = useState('All');
  return (
    <Select value={position} onValueChange={setPosition}>
      <SelectTrigger className="w-55 flex items-center gap-2 text-md font-medium">
        <Filter className="size-5" />
        Position: <SelectValue placeholder="All" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="All">All</SelectItem>

        {allPositions.map(pos => (
          <SelectItem key={pos.value} value={pos.value}>
            {pos.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

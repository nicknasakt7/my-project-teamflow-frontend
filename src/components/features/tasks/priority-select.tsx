'use client';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function PrioritySelect() {
  return (
    <div className="space-y-2">
      <Label className="text-md">Priority *</Label>

      <Select>
        <SelectTrigger>
          <SelectValue placeholder="MEDIUM" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="low">LOW</SelectItem>
          <SelectItem value="medium">MEDIUM</SelectItem>
          <SelectItem value="high">HIGH</SelectItem>
        </SelectContent>
      </Select>

      <p className="text-xs text-muted-foreground">• Normal priority</p>
    </div>
  );
}

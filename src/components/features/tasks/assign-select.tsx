import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function AssignSelect() {
  return (
    <div className="space-y-2">
      <Label className="text-md">Assign To *</Label>

      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select team member" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="1">John Smith</SelectItem>
          <SelectItem value="2">Jane Doe</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

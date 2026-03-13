import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function StatusSelect() {
  return (
    <div className="space-y-2">
      <Label>Initial Status</Label>

      <Select>
        <SelectTrigger>
          <SelectValue placeholder="TODO" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="todo">TODO</SelectItem>
          <SelectItem value="in-progress">IN PROGRESS</SelectItem>
          <SelectItem value="done">DONE</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

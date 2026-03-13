import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function InputFilter() {
  return (
    <div className="flex gap-4">
      <Input placeholder="Search projects..." className="placeholder:text-lg" />

      <Select defaultValue="all">
        <SelectTrigger className="w-60 p-4 text-md">
          <SelectValue placeholder="Status: All" className="text-foreground " />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="on-hold">On Hold</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

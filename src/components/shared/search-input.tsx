import { Search } from 'lucide-react';
import { Input } from '../ui/input';

export default function SearchInput() {
  return (
    <div className="relative flex-1 w-105">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
      <Input
        placeholder="Search by name, last name, or email..."
        className="pl-9 placeholder:text-lg"
      />
    </div>
  );
}

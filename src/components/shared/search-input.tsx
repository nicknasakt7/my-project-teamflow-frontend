'use client';

import { Search } from 'lucide-react';
import { Input } from '../ui/input';

type SearchInputProps = {
  placeholder?: string;
  onChange?: (value: string) => void;
  className?: string;
};

export default function SearchInput({ placeholder = 'Search...', onChange, className }: SearchInputProps) {
  return (
    <div className={`relative flex-1 ${className ?? ''}`}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        className="pl-9 placeholder:text-lg"
        onChange={e => onChange?.(e.target.value)}
      />
    </div>
  );
}

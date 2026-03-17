'use client';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

type DatePickerInputProps = {
  id: string;
  isValid: boolean;
  value: Date | undefined;
  onValueChange: (...event: unknown[]) => void;
};
export default function DatePickerInput({
  id,
  isValid,
  value,
  onValueChange,
}: DatePickerInputProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'justify-start px-3 font-normal h-12',
            !isValid && 'border-destructive',
          )}
        >
          {value ? (
            format(value, 'dd MMMM yyyy')
          ) : (
            <span className="text-muted-foreground text-[1.00rem]">
              Select Date Of Birth
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-4">
        <Calendar
          className="scale-110"
          mode="single"
          captionLayout="dropdown"
          selected={value}
          onSelect={date => {
            onValueChange(date);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

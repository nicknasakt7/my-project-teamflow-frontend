import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { positionLabels, positions } from '@/constants/positions';

type PositionSelectProps = {
  field: any;
  fieldState: any;
};

export default function PositionSelect({
  field,
  fieldState,
}: PositionSelectProps) {
  return (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel className="text-lg">Position</FieldLabel>

      <Select value={field.value ?? ''} onValueChange={field.onChange}>
        <SelectTrigger aria-invalid={fieldState.invalid} size="lg">
          <SelectValue placeholder="Select position" />
        </SelectTrigger>

        <SelectContent>
          {positions.map(position => (
            <SelectItem key={position} value={position}>
              {positionLabels[position]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  );
}

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { adminPositionLabels, adminPositions } from '@/constants/positions';

type PositionAdminSelectProps = {
  field: any;
  fieldState: any;
};

export default function PositionAdminSelect({
  field,
  fieldState,
}: PositionAdminSelectProps) {
  return (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel className="text-lg">Position</FieldLabel>

      <Select value={field.value ?? ''} onValueChange={field.onChange}>
        <SelectTrigger aria-invalid={fieldState.invalid} size="lg">
          <SelectValue placeholder="Select position" />
        </SelectTrigger>

        <SelectContent>
          {adminPositions.map(adminPosition => (
            <SelectItem key={adminPosition} value={adminPosition}>
              {adminPositionLabels[adminPosition]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  );
}

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';

import { FieldTypeProps } from './types/field-type';

export default function LevelSelect({ field, fieldState }: FieldTypeProps) {
  return (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel className="text-lg">Employment Level</FieldLabel>

      <Select value={field.value ?? ''} onValueChange={field.onChange}>
        <SelectTrigger aria-invalid={fieldState.invalid} size="lg">
          <SelectValue placeholder="Select level" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="JUNIOR">Junior</SelectItem>
          <SelectItem value="MID">Mid</SelectItem>
          <SelectItem value="SENIOR">Senior</SelectItem>
          <SelectItem value="LEAD">Lead</SelectItem>
        </SelectContent>
      </Select>

      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  );
}

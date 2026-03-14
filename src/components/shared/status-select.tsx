import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';

type Props = {
  field: any;
  fieldState: any;
};

export default function StatusSelect({ field, fieldState }: Props) {
  return (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel>Status</FieldLabel>

      <Select value={field.value ?? ''} onValueChange={field.onChange}>
        <SelectTrigger aria-invalid={fieldState.invalid}>
          <SelectValue placeholder="Select status" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="ACTIVE">Active</SelectItem>
          <SelectItem value="INACTIVE">Inactive</SelectItem>
          <SelectItem value="LEAVE">Leave</SelectItem>
        </SelectContent>
      </Select>

      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  );
}

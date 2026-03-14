import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';

type GenderSelectProps = {
  field: any;
  fieldState: any;
};

export default function GenderSelect({ field, fieldState }: GenderSelectProps) {
  return (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel className="text-lg">Gender</FieldLabel>

      <Select value={field.value ?? ''} onValueChange={field.onChange}>
        <SelectTrigger aria-invalid={fieldState.invalid} size="lg">
          <SelectValue placeholder="Select gender" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="MALE">Male</SelectItem>
          <SelectItem value="FEMALE">Female</SelectItem>
          <SelectItem value="OTHER">Other</SelectItem>
        </SelectContent>
      </Select>

      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  );
}

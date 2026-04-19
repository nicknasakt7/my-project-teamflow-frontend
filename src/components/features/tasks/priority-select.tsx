import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FieldTypeProps } from '@/components/shared/types/field-type';

export default function PrioritySelect({ field, fieldState }: FieldTypeProps) {
  return (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel className="text-md">
        Priority <span className="text-red-500">*</span>
      </FieldLabel>

      <Select value={field.value ?? ''} onValueChange={field.onChange}>
        <SelectTrigger aria-invalid={fieldState.invalid}>
          <SelectValue placeholder="Select priority" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="LOW">Low</SelectItem>
          <SelectItem value="MEDIUM">Medium</SelectItem>
          <SelectItem value="HIGH">High</SelectItem>
          <SelectItem value="URGENT">Urgent</SelectItem>
        </SelectContent>
      </Select>

      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  );
}

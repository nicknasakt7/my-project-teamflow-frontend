import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FieldTypeProps } from '@/components/shared/types/field-type';

type Member = { id: string; firstName: string; lastName: string };

type AssignSelectProps = FieldTypeProps & {
  members: Member[];
};

export default function AssignSelect({
  field,
  fieldState,
  members,
}: AssignSelectProps) {
  return (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel className="text-md">
        Assign To <span className="text-red-500">*</span>
      </FieldLabel>

      <Select value={field.value ?? ''} onValueChange={field.onChange}>
        <SelectTrigger aria-invalid={fieldState.invalid}>
          <SelectValue placeholder="Select team member" />
        </SelectTrigger>

        <SelectContent>
          {members.map((m) => (
            <SelectItem key={m.id} value={m.id}>
              {m.firstName} {m.lastName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  );
}

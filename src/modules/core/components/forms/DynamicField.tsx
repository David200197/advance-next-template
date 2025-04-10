import { FieldControl, Field } from "./types/form-type";
import { Input } from "../../ui/input";
import { Skeleton } from "../../ui/skeleton";
import { ZodObject } from "zod";
import { DatePicker } from "../../ui/datepicker";
import { DatePickerWithRange } from "../../ui/datepicker-with-range";
import { Dropdown } from "../../ui/dropdown";
import { Textarea } from "../../ui/textarea";
import { JSX } from "react";
import { Checkbox } from "../../ui/checkbox";

type Props<T extends ZodObject<any>> = {
  fieldControl: FieldControl;
  field?: Field<T>;
  loading?: boolean;
  disabled?: boolean;
};

export const dynamicField = <T extends ZodObject<any>>({
  fieldControl,
  field,
  loading,
  disabled,
}: Props<T>) => {
  if (loading || field?.loading) {
    return <Skeleton className="w-full h-[37px] rounded-md" />;
  }

  const fieldMap: Record<string, () => JSX.Element | null> = {
    input: () => (
      <Input
        {...fieldControl}
        placeholder={field?.placeholder}
        disabled={disabled || field?.disabled}
      />
    ),
    textarea: () => (
      <Textarea
        {...fieldControl}
        placeholder={field?.placeholder}
        disabled={disabled || field?.disabled}
      />
    ),
    inputNumber: () => (
      <Input
        {...fieldControl}
        onChange={(e) => fieldControl.onChange(Number(e.target.value))}
        value={Number(fieldControl.value)}
        placeholder={field?.placeholder}
        type="number"
        min={field?.type === "inputNumber" ? field.min : undefined}
        max={field?.type === "inputNumber" ? field.max : undefined}
        disabled={disabled || field?.disabled}
      />
    ),
    inputSelect: () => (
      <Dropdown
        {...fieldControl}
        options={field?.type === "inputSelect" ? field.options || [] : []}
        placeholder={field?.placeholder}
        disabled={disabled || field?.disabled}
      />
    ),
    inputDate: () => (
      <DatePicker
        {...fieldControl}
        format={field?.type === "inputDate" ? field.format : undefined}
        disabled={disabled || field?.disabled}
      />
    ),
    inputRangeDate: () => (
      <DatePickerWithRange
        {...fieldControl}
        format={field?.type === "inputRangeDate" ? field.format : undefined}
        disabled={disabled || field?.disabled}
      />
    ),
    inputPassword: () => (
      <Input
        {...fieldControl}
        placeholder={field?.placeholder}
        disabled={disabled || field?.disabled}
        type="password"
      />
    ),
    inputFile: () => (
      <Input
        {...fieldControl}
        placeholder={field?.placeholder}
        disabled={disabled || field?.disabled}
        type="file"
        accept={field?.type === "inputFile" ? field.accept : undefined}
      />
    ),
    checkbox: () => (
      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          {...fieldControl}
          disabled={disabled || field?.disabled}
        />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {field?.placeholder}
        </label>
      </div>
    ),
  };

  return field?.type ? fieldMap[field.type]?.() || null : null;
};

import { ReactNode } from "react";
import { FieldControl, Field } from "./types/form-type";
import { Input } from "../../ui/input";
import { Skeleton } from "../../ui/skeleton";
import { ZodObject } from "zod";
import { DatePicker } from "../../ui/datepicker";
import { DatePickerWithRange } from "../../ui/datepicker-with-range";
import { Dropdown } from "../../ui/dropdown";

type Props<T extends ZodObject<any>> = {
  fieldControl: FieldControl;
  field?: Field<T>;
  loading?: boolean;
  disabled?: boolean;
};
export const DynamicField = <T extends ZodObject<any>>({
  fieldControl,
  field,
  loading,
  disabled,
}: Props<T>) => {
  if (loading || field?.loading)
    return <Skeleton className="w-full h-[37px] rounded-md" />;

  const input = () => (
    <Input
      {...fieldControl}
      placeholder={field?.placeholder}
      disabled={disabled || field?.disabled}
    />
  );

  const inputNumber = () => (
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
  );

  const inputSelect = () => (
    <Dropdown
      {...fieldControl}
      options={field?.type === "inputSelect" ? field.options : []}
      placeholder={field?.placeholder}
      disabled={disabled || field?.disabled}
    />
  );

  const inputDate = () => (
    <DatePicker
      {...fieldControl}
      format={field?.type === "inputDate" ? field.format : undefined}
      disabled={disabled || field?.disabled}
    />
  );

  const inputRangeDate = () => (
    <DatePickerWithRange
      {...fieldControl}
      format={field?.type === "inputRangeDate" ? field.format : undefined}
      disabled={disabled || field?.disabled}
    />
  );

  const components: Record<Field<T>["type"], () => ReactNode> = {
    input,
    inputNumber,
    inputSelect,
    inputDate,
    inputRangeDate,
  };

  const Component = field?.type ? components[field?.type] : input;

  return <Component />;
};

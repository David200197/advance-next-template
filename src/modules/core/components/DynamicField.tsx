import { ReactNode } from "react";
import { ZodObject } from "zod";
import { FieldControl, Field } from "../types/form-type";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";

type Props<T extends ZodObject<any>> = {
  fieldControl: FieldControl;
  field?: Field;
  loading?: boolean;
};
export const DynamicField = <T extends ZodObject<any>>({
  fieldControl,
  field,
  loading,
}: Props<T>) => {
  if (loading) return <Skeleton className="w-full h-[37px] rounded-md" />;

  const input = () => (
    <Input {...fieldControl} placeholder={field?.placeholder} />
  );

  const inputNumber = () => (
    <Input {...fieldControl} placeholder={field?.placeholder} />
  );

  const dropdown = () => (
    <Input {...fieldControl} placeholder={field?.placeholder} />
  );

  const inputDate = () => (
    <Input {...fieldControl} placeholder={field?.placeholder} />
  );

  const components: Record<Field["type"], () => ReactNode> = {
    input,
    inputNumber,
    dropdown,
    inputDate,
  };

  const Component = field?.type ? components[field?.type] : input;

  return <Component />;
};

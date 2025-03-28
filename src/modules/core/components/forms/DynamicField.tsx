import { ReactNode } from "react";
import { FieldControl, Field } from "./types/form-type";
import { Input } from "../../ui/input";
import { Skeleton } from "../../ui/skeleton";

type Props = {
  fieldControl: FieldControl;
  field?: Field;
  loading?: boolean;
};
export const DynamicField = ({ fieldControl, field, loading }: Props) => {
  if (loading || (field as { loading?: boolean })?.loading)
    return <Skeleton className="w-full h-[37px] rounded-md" />;

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

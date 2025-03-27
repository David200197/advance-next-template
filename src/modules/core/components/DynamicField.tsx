import { ReactNode } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { infer as zInfer, ZodObject } from "zod";
import { FieldType } from "../types/FieldType";
import { Input } from "../ui/input";

type FieldControl = ControllerRenderProps<
  {
    [x: string]: any;
  },
  string
>;

type Props<T extends ZodObject<any>> = {
  fieldControl: FieldControl;
  field?: Record<keyof zInfer<T>, FieldType>[string];
};
export const DynamicField = <T extends ZodObject<any>>({
  fieldControl,
  field,
}: Props<T>) => {
  if (field?.isLoading) return <div>Loading...</div>;

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

  const components: Record<FieldType["type"], () => ReactNode> = {
    input,
    inputNumber,
    dropdown,
    inputDate,
  };

  const Component = field?.type ? components[field?.type] : input;

  return <Component />;
};

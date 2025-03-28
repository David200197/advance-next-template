import { ControllerRenderProps } from "react-hook-form";
import { ZodObject, infer as zInfer } from "zod";

type Option = {
  label: string;
  value: any;
};

export type FieldProperty<Type extends string, Object extends object = {}> = {
  type: Type;
  description?: string;
  className?: string;
  placeholder?: string;
} & Object;

export type Field =
  | FieldProperty<"input">
  | FieldProperty<"inputNumber">
  | FieldProperty<"dropdown", { options: Option[], loading?: boolean }>
  | FieldProperty<"inputDate">;

export type AsyncValue<T> = {
  value: T;
  loading: boolean;
};

export type Fields<T extends ZodObject<any>> = Partial<
  Record<keyof zInfer<T>, Field>
>;

export type OnSubmit<T extends ZodObject<any>> = (
  data: zInfer<T>
) => Promise<void>;

export type DefaultValues<T extends ZodObject<any>> = Partial<zInfer<T>>;

export type UpdatedValues<T extends ZodObject<any>> = Partial<
  Record<keyof zInfer<T>, AsyncValue<zInfer<T>[keyof zInfer<T>]>>
>;

export type FieldControl = ControllerRenderProps<
  {
    [x: string]: any;
  },
  string
>;

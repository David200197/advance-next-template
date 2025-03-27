type Option = {
  label: string;
  value: any;
};

type Field<Type extends string, Object extends object = {}> = {
  type: Type;
  isLoading?: boolean;
  description?: string;
  className?: string;
  placeholder?: string;
} & Object;

export type FieldType =
  | Field<"input">
  | Field<"inputNumber">
  | Field<"dropdown", { options: Option[] }>
  | Field<"inputDate">;

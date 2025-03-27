type FieldType =
  | { type: "input"; isLoading?: boolean }
  | { type: "inputNumber"; isLoading?: boolean }
  | { type: "dropdown"; options: string[]; isLoading?: boolean }
  | { type: "inputDate"; isLoading?: boolean };

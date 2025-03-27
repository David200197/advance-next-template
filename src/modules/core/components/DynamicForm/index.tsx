import { DefaultValues, useForm } from "react-hook-form";
import { ZodObject, infer as zInfer } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

export type DynamicFormProps<T extends ZodObject<any>> = {
  schema: T;
  onSubmit: (data: zInfer<T>) => void;
  defaultValues?: Partial<zInfer<T>>;
  updatedValues?: Partial<zInfer<T>>;
  fieldTypes?: Record<keyof zInfer<T>, FieldType>;
};

export const DynamicForm = <T extends ZodObject<any>>({
  schema,
  onSubmit,
  defaultValues = {},
  updatedValues,
  //fieldTypes = {},
}: DynamicFormProps<T>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<zInfer<T>>,
  });

  useEffect(() => {
    if (!updatedValues) return;
    for (const key in updatedValues) {
      if (updatedValues[key]) {
        setValue(key, updatedValues[key]);
      }
    }
  }, [updatedValues, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {Object.keys(schema.shape).map((key) => (
        <div key={key}>
          <label>{key}</label>
          <input {...register(key)} defaultValue={defaultValues[key]} />
          {errors[key] && (
            <p style={{ color: "red" }}>
              {String(errors[key as keyof zInfer<T>]?.message || "")}
            </p>
          )}
        </div>
      ))}
      <button type="submit">Enviar</button>
    </form>
  );
};

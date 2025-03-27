import { DefaultValues, useForm } from "react-hook-form";
import { ZodObject, infer as zInfer } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { DynamicField } from "./DynamicField";
import { FieldType } from "../types/FieldType";

export type DynamicFormProps<T extends ZodObject<any>> = {
  schema: T;
  onSubmit: (data: zInfer<T>) => void;
  defaultValues?: Partial<zInfer<T>>;
  updatedValues?: Partial<zInfer<T>>;
  fields?: Partial<Record<keyof zInfer<T>, FieldType>>;
  onBack?: () => void;
};

export const DynamicForm = <T extends ZodObject<any>>({
  schema,
  onSubmit,
  defaultValues = {},
  updatedValues,
  onBack,
  fields,
}: DynamicFormProps<T>) => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<zInfer<T>>,
  });

  useEffect(() => {
    if (!updatedValues) return;
    for (const key in updatedValues) {
      if (updatedValues[key]) {
        form.setValue(key, updatedValues[key]);
      }
    }
  }, [updatedValues, form.setValue]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
        <div className="grid grid-cols md:grid-cols-3 gap-4">
          {Object.keys(schema.shape).map((key) => (
            <FormField
              key={key}
              control={form.control}
              name={key}
              render={({ field: fieldControl }) => {
                const field = fields?.[key];

                return (
                  <FormItem className={field?.className ?? "mb-4"}>
                    <FormLabel>{key}</FormLabel>
                    <FormControl>
                      <DynamicField fieldControl={fieldControl} field={field} />
                    </FormControl>
                    <div className="relative">
                      <div className="flex flex-col absolute -top-1">
                        {field?.description && (
                          <FormDescription className="text-xs">
                            {field.description}
                          </FormDescription>
                        )}
                        <FormMessage className="text-xs" />
                      </div>
                    </div>
                  </FormItem>
                );
              }}
            />
          ))}
        </div>

        <div className="flex justify-between">
          <Button type="button" variant={"secondary"} onClick={onBack}>
            Cancel
          </Button>
          <Button type="submit" variant={"default"}>
            Send
          </Button>
        </div>
      </form>
    </Form>
  );
};

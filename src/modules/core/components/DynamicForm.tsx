import {
  DefaultValues as HookFormDefaultValues,
  useForm,
} from "react-hook-form";
import { ZodObject, infer as zInfer } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
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
import {
  DefaultValues,
  Fields,
  OnSubmit,
  UpdatedValues,
} from "../types/form-type";
import { createLoadingByUpdatedValues } from "../utils/create-loading-by-updated-values";
import { Loader } from "lucide-react";

export type DynamicFormProps<T extends ZodObject<any>> = {
  schema: T;
  onSubmit: OnSubmit<T>;
  defaultValues?: DefaultValues<T>;
  updatedValues?: UpdatedValues<T>;
  fields?: Fields<T>;
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
  const updateValuesLoading = createLoadingByUpdatedValues(updatedValues);
  const [formLoading, setFormLoading] = useState(false);
  const loading = updateValuesLoading || formLoading;

  const handleSubmit = async (values: zInfer<T>) => {
    setFormLoading(true);
    await onSubmit(values);
    setFormLoading(false);
  };

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as HookFormDefaultValues<zInfer<T>>,
  });

  useEffect(() => {
    if (!updatedValues) return;
    for (const key in updatedValues) {
      if (!updatedValues[key]) continue;
      form.setValue(key, updatedValues[key].value);
    }
  }, [updatedValues, form.setValue]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 ">
        <div className="grid grid-cols md:grid-cols-3 gap-4">
          {Object.keys(schema.shape).map((key) => (
            <FormField
              key={key}
              control={form.control}
              name={key}
              render={({ field: fieldControl }) => {
                const field = fields?.[key];
                const loading = updatedValues?.[key]?.loading;

                return (
                  <FormItem className={field?.className ?? "mb-4"}>
                    <FormLabel>{key}</FormLabel>
                    <FormControl>
                      <DynamicField
                        fieldControl={fieldControl}
                        field={field}
                        loading={loading}
                      />
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
          <Button type="submit" variant={"default"} disabled={loading}>
            {loading && <Loader className="animate-spin" />}Send
          </Button>
        </div>
      </form>
    </Form>
  );
};

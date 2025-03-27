import React, { useEffect, useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { z } from "zod";
import {
  DynamicForm,
  DynamicFormProps,
} from "@/modules/core/components/DynamicForm";
import { sleep } from "@/modules/core/utils/sleep";
import { UpdatedValues } from "@/modules/core/types/form-type";

// 📌 Esquema de validación con Zod
const schema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Correo inválido"),
  age: z.number().min(18, "Debes tener al menos 18 años"),
  async: z.string(),
});

type FormValues = z.infer<typeof schema>;

// 📌 Configuración de Storybook
export default {
  title: "Components/DynamicForm",
  component: DynamicForm,
  argTypes: {
    onSubmit: { action: "submitted" },
  },
} as Meta<typeof DynamicForm>;

// 📌 Template para Storybook
const Template: StoryFn<DynamicFormProps<typeof schema>> = (args) => {
  const [updatedValues, setUpdatedValues] = useState({
    async: { loading: true, value: "" },
  } as UpdatedValues<typeof schema>);

  useEffect(() => {
    setTimeout(() => {
      setUpdatedValues({});
    }, 3000);
  }, []);

  return <DynamicForm {...args} updatedValues={updatedValues} />;
};

// 📌 Historia principal
export const Default = Template.bind({});
Default.args = {
  schema,
  onSubmit: async (data: FormValues) => {
    await sleep(3);
    console.log("Formulario enviado:", data);
  },
  defaultValues: {
    name: "Juan",
  },
  fields: {
    name: {
      type: "input",
      description: "*This is a example",
      placeholder: "insert your name...",
    },
    email: {
      type: "input",
      placeholder: "Insert your email...",
    },
  },
};

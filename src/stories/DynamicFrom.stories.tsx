import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { z } from "zod";
import {
  DynamicForm,
  DynamicFormProps,
} from "@/modules/core/components/DynamicForm";

// 📌 Esquema de validación con Zod
const schema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Correo inválido"),
  age: z.number().min(18, "Debes tener al menos 18 años"),
});

const defaultValues = {
  name: "Juan",
};

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
const Template: StoryFn<DynamicFormProps<typeof schema>> = (args) => (
  <DynamicForm {...args} />
);

// 📌 Historia principal
export const Default = Template.bind({});
Default.args = {
  schema,
  onSubmit: (data: FormValues) => console.log("Formulario enviado:", data),
  defaultValues,
};

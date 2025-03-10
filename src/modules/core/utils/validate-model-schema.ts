import { z, ZodRawShape } from "zod";

export const validateModelSchema = <T>(
  modelName: string,
  schema: z.ZodObject<ZodRawShape> | z.ZodArray<z.ZodObject<ZodRawShape>>,
  data: T
) => {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error(
      `Validation failed in ${modelName}:\n` +
        result.error.errors.map((e) => `- ${e.path}: ${e.message}`).join("\n")
    );
  }
  return result.data as T;
};

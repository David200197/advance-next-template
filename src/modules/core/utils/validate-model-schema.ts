import { z, ZodRawShape } from "zod";

export const validateSchema = <T>(
  name: string,
  schema: z.ZodObject<ZodRawShape> | z.ZodArray<z.ZodAny>,
  data: T
) => {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new TypeError(
      `Validation failed in ${name}:\n` +
        result.error.errors.map((e) => `- ${e.path}: ${e.message}`).join("\n")
    );
  }
  return result.data as T;
};

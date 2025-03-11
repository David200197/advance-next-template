import { z } from "zod";
import { validateSchema } from "../utils/validate-model-schema";

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
});

type Env = z.infer<typeof envSchema>;

export const env = validateSchema(
  "Env",
  envSchema,
  process.env as unknown as Env
);

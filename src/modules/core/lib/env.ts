import { z } from "zod";
import { validateSchema } from "../utils/validate-model-schema";

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
});

export const env = validateSchema("Env", envSchema, {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
});

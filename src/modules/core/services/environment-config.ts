import { injectable } from "inversify";
import { z, infer as ZInfer } from "zod";
import { validateSchema } from "../utils/validate-model-schema";

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
});

type EnvSchema = ZInfer<typeof envSchema>;

@injectable()
export class EnvironmentConfig {
  private readonly env: EnvSchema;

  constructor() {
    this.env = validateSchema("Env", envSchema, {
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL ?? "--",
    });
  }

  get(key: keyof EnvSchema) {
    return this.env[key];
  }
}

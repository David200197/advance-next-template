import { validateSchema } from "@/modules/core/utils/validate-model-schema";
import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
});

export type UserSchema = z.infer<typeof userSchema>;

export class User implements UserSchema {
  id!: string;
  name!: string;
  email!: string;

  private constructor(data: UserSchema) {
    Object.assign(this, data);
  }

  static create(data: UserSchema) {
    return new User(validateSchema(User.name, userSchema, data));
  }

  getDisplayName() {
    return `${this.name} (${this.email})`;
  }
}

import { Model } from "@/modules/core/decorators/Model";
import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
});

export type UserSchema = z.infer<typeof userSchema>;

@Model(userSchema)
export class User implements UserSchema {
  id!: string;
  name!: string;
  email!: string;

  constructor(data: UserSchema) {
    Object.assign(this, data);
  }

  getDisplayName() {
    return `${this.name} (${this.email})`;
  }
}

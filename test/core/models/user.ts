import { Entity } from "@/modules/core/decorators/Entity";
import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  age: z.number(),
});

export type UserSchema = z.infer<typeof userSchema>;

@Entity(userSchema)
export class User implements UserSchema {
  id!: string;
  name!: string;
  email!: string;
  age!: number;

  constructor(data: UserSchema) {
    Object.assign(this, data);
  }

  getDisplayName() {
    return `${this.name} (${this.email})`;
  }
}

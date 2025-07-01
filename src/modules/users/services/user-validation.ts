import { Injectable } from "@/modules/core/decorators/Injectable";
import { ZodValidator } from "@/modules/core/lib/ZodValidator";
import { z } from "zod";

const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});

const usersSchema = z.array(userSchema);

type UserSchema = z.infer<typeof userSchema>;
type UsersSchema = z.infer<typeof usersSchema>;

@Injectable()
export class UserValidation {
  constructor(private readonly zodValidator: ZodValidator) {}

  validateUser(data: UserSchema) {
    return this.zodValidator.validate("user", userSchema, data);
  }

  validateUsers(data: UsersSchema) {
    return this.zodValidator.validate("users", usersSchema, data);
  }
}

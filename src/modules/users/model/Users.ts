import { z } from "zod";
import { User, userSchema } from "./User";
import { validateSchema } from "@/modules/core/utils/validate-model-schema";
import { Collections } from "@/modules/core/models/Collection";

const usersSchema = z.array(userSchema);

export type UsersSchema = z.infer<typeof usersSchema>;

export class Users extends Collections<User> {
  private constructor(...users: User[]) {
    super(...users);
  }

  static create(users: UsersSchema) {
    const currentUsers = validateSchema(Users.name, usersSchema, users);
    return new Users(...currentUsers.map((user) => User.create(user)));
  }
}

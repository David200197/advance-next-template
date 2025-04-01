import { z } from "zod";
import { User, userSchema } from "./User";
import { Collections } from "@/modules/core/models/Collection";
import { Entity } from "@/modules/core/decorators/Entity";

const usersSchema = z.array(userSchema);
export type UsersSchema = z.infer<typeof usersSchema>;

@Entity(usersSchema)
export class Users extends Collections<User> {
  constructor(usersSchema: UsersSchema) {
    super(...usersSchema.map((user) => new User(user)));
  }
}

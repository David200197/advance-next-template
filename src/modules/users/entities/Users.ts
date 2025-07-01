import { User } from "./User";
import { Collection } from "@/modules/core/lib/Collection";
import { UserSchema } from "./UserSchema";

export class Users extends Collection<User> {
  constructor(...users: User[]) {
    super(...users);
  }

  static create(data: UserSchema[]) {
    return new this(...data.map((user) => new User(user)));
  }
}

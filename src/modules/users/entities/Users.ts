import { User, UserSchema } from "./User";
import { Collection } from "@/modules/core/lib/Collection";
import { Entities } from "@/modules/core/decorators/Entities";

@Entities()
export class Users extends Collection<User> {
  constructor(...users: User[]) {
    super(...users);
  }

  static create(data: UserSchema[]) {
    return new this(...data.map((user) => new User(user)));
  }
}
import { User, UserSchema } from "./User";
import { Collections } from "@/modules/core/models/Collection";
import { Entities } from "@/modules/core/decorators/Entities";

@Entities()
export class Users extends Collections<User> {
  constructor(...users: User[]) {
    super(...users);
  }

  static create(data: UserSchema[]) {
    return new this(...data.map((user) => new User(user)));
  }
}

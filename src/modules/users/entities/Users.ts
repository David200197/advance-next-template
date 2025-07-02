import { User } from "./User";
import { Collection } from "@/modules/core/lib/Collection";
import { GetUsersResponseDTO } from "../dtos/GetUsersResponseDTO";

export class Users extends Collection<User> {
  constructor(...users: User[]) {
    super(...users);
  }

  static create(data: GetUsersResponseDTO) {
    return new this(...data.map((user) => new User(user)));
  }
}

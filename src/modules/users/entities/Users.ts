import { User } from "./User";
import { GetUsersResponseDTO } from "../dtos/GetUsersResponseDTO";
import { Entities } from "@/modules/core/lib/Entities";

export class Users extends Entities<User> {
  constructor(users: User[]) {
    super(users);
  }

  static create(data: GetUsersResponseDTO) {
    return new this(data.map((user) => new User(user)));
  }
}

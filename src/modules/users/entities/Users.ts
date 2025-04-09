import { User, UserSchema } from "./User";
import { Collection } from "@/modules/core/lib/Collection";
import { Entities } from "@/modules/core/decorators/Entities";
import { HttpClient } from "@/modules/core/models/HttpClient";

@Entities()
export class Users extends Collection<User> {
  private httpClient!: HttpClient;

  injectDependencies(httpClient: HttpClient) {
    if (!this.httpClient) this.httpClient = httpClient;
  }

  constructor(...users: User[]) {
    super(...users);
  }

  static create(data: UserSchema[]) {
    return new this(...data.map((user) => new User(user)));
  }
}

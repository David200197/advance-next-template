import { Injectable } from "@/modules/core/decorators/Injectable";
import { User, UserSchema } from "../entities/User";
import type { HttpClient } from "@/modules/core/models/HttpClient";
import { InjectHttpClient } from "@/modules/core/decorators/InjectHttpClient";
import { Users } from "../entities/Users";

@Injectable()
export class UserFactory {
  constructor(
    @InjectHttpClient()
    private readonly httpClient: HttpClient
  ) {}

  createUser(data: UserSchema) {
    const user = new User(data);
    user.injectDependencies(this.httpClient);
    return user;
  }

  createUsers(data: UserSchema[]) {
    const users = Users.create(data);
    users.injectDependencies(this.httpClient);
    return users;
  }
}

import { User, UserSchema } from "../model/User";
import { Users, UsersSchema } from "../model/Users";
import { injectable } from "inversify";
import type { HttpClient } from "@/modules/core/models/HttpClient";
import { injectHttpClient } from "@/modules/core/decorators/inject-http-client";

@injectable()
export class UserService {
  private readonly BASE_URL = "/user";

  constructor(
    @injectHttpClient()
    private readonly httpClient: HttpClient
  ) {}

  getUser = async (id: string) => {
    const user = await this.httpClient.get<UserSchema>(
      `${this.BASE_URL}/${id}`
    );
    return User.create(user);
  };

  getUsers = async () => {
    const users = await this.httpClient.get<UsersSchema>(this.BASE_URL);
    return Users.create(users);
  };
}

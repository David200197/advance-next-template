import { User, UserSchema } from "../entities/User";
import { Users, UsersSchema } from "../entities/Users";
import type { HttpClient } from "@/modules/core/models/HttpClient";
import { InjectHttpClient } from "@/modules/core/decorators/InjectHttpClient";
import { Injectable } from "@/modules/core/decorators/Injectable";

@Injectable()
export class UserService {
  private readonly BASE_URL = "/user";

  constructor(
    @InjectHttpClient()
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

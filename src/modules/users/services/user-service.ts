import type { HttpClient } from "@/modules/core/models/HttpClient";
import { InjectHttpClient } from "@/modules/core/decorators/InjectHttpClient";
import { Injectable } from "@/modules/core/decorators/Injectable";
import { UserFactory } from "./user-factory";
import { UserSchema } from "../entities/User";

@Injectable()
export class UserService {
  private readonly BASE_URL = "/users";

  constructor(
    @InjectHttpClient()
    private readonly httpClient: HttpClient,
    private readonly userFactory: UserFactory
  ) {}

  getUser = async (id: number) => {
    const user = await this.httpClient.get<UserSchema>(
      `${this.BASE_URL}/${id}`
    );
    return this.userFactory.createUser(user);
  };

  getUsers = async () => {
    const users = await this.httpClient.get<UserSchema[]>(this.BASE_URL);
    return this.userFactory.createUsers(users);
  };
}

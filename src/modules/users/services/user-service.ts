import type { HttpClient } from "@/modules/core/models/HttpClient";
import { InjectHttpClient } from "@/modules/core/decorators/InjectHttpClient";
import { Injectable } from "@/modules/core/decorators/Injectable";
import { UserValidation } from "./user-validation";
import { UserSchema } from "../entities/UserSchema";
import { User } from "../entities/User";
import { Users } from "../entities/Users";

@Injectable()
export class UserService {
  private readonly BASE_URL = "/users";

  constructor(
    @InjectHttpClient()
    private readonly httpClient: HttpClient,
    private readonly userValidation: UserValidation
  ) {}

  getUser = async (id: number) => {
    const response = await this.httpClient.get<UserSchema>(
      `${this.BASE_URL}/${id}`
    );
    const userValidated = this.userValidation.validateUser(response);
    return new User(userValidated);
  };

  getUsers = async () => {
    const response = await this.httpClient.get<UserSchema[]>(this.BASE_URL);
    const usersValidate = this.userValidation.validateUsers(response);
    return Users.create(usersValidate);
  };

  updateUser = async (user: User) => {
    await this.httpClient.patch(`${this.BASE_URL}/${user.id}`, user);
  };

  deleteUser = async (user: User) => {
    await this.httpClient.delete(`${this.BASE_URL}/${user.id}`);
  };
}

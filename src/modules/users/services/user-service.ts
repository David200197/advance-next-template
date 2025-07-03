import type { HttpClient } from "@/modules/core/models/HttpClient";
import { InjectHttpClient } from "@/modules/core/decorators/InjectHttpClient";
import { Injectable } from "@/modules/core/decorators/Injectable";
import { User } from "../entities/User";
import { Users } from "../entities/Users";
import { InjectUserValidator } from "../decorators/InjectUserValidator";
import type { UserValidator } from "../models/UserValidator";
import type { GetUserResponseDTO } from "../dtos/GetUserResponseDTO";
import type { GetUsersResponseDTO } from "../dtos/GetUsersResponseDTO";
import { UrlBuilder } from "@/modules/core/lib/UrlBuilder";

@Injectable()
export class UserService {
  private readonly BASE_URL = "/users";

  constructor(
    @InjectHttpClient()
    private readonly httpClient: HttpClient,
    @InjectUserValidator()
    private readonly userValidation: UserValidator
  ) {}

  getUser = async (id: number) => {
    const urlBuilder = new UrlBuilder(this.BASE_URL, id);
    const response = await this.httpClient.get<GetUserResponseDTO>(
      urlBuilder.build()
    );
    return new User(this.userValidation.validateGetUserResponse(response));
  };

  getUsers = async () => {
    const response = await this.httpClient.get<GetUsersResponseDTO>(
      this.BASE_URL
    );
    return Users.create(this.userValidation.validateGetUsersResponse(response));
  };

  updateUser = async (user: User) => {
    await this.httpClient.patch(`${this.BASE_URL}/${user.id}`, user);
  };

  deleteUser = async (user: User) => {
    await this.httpClient.delete(`${this.BASE_URL}/${user.id}`);
  };
}

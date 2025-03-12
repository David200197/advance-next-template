import { apiClient } from "@/modules/core/lib/axios";
import { User } from "../model/User";
import { Users } from "../model/Users";
import { fn } from "@/modules/core/interceptors/global-error-handler";

const BASE_URL = "/user";

export const getUser = fn(async (id: string) => {
  const response = await apiClient.get(`${BASE_URL}/${id}`);
  return User.create(response.data);
});

export const getUsers = fn(async () => {
  const response = await apiClient.get(BASE_URL);
  return Users.create(response.data);
});

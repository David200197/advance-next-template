import { apiClient } from "@/modules/core/lib/axios";
import { User } from "../model/User";
import { Users } from "../model/Users";

const BASE_URL = "/user";

export const getUser = async (id: string) => {
  const response = await apiClient.get(`${BASE_URL}/${id}`);
  return User.create(response.data);
};

export const getUsers = async () => {
  const response = await apiClient.get(BASE_URL);
  return Users.create(response.data);
};

import { apiClient } from "@/modules/core/lib/axios";
import { User } from "../model/User";

const BASE_URL = "/user";

export const getUser = async (id: string) => {
  const response = await apiClient.get(`${BASE_URL}/${id}`);
  return User.create(response.data);
};

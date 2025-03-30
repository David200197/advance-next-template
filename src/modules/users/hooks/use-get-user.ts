import { useGetService } from "@/modules/core/contexts/DiContext";
import { useQuery } from "@tanstack/react-query";
import { User } from "../model/User";
import { UserService } from "../services/user-service";

export const useGetUser = () => {
  const userService = useGetService(UserService);

  const { isLoading, error, data } = useQuery<User, Error>({
    queryKey: ["user"],
    queryFn: () => {
      return userService.getUser("");
    },
  });

  return { user: data, isLoading, error };
};

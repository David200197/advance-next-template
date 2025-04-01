import { useGetService } from "@/modules/core/contexts/DiContext";
import { useQuery } from "@tanstack/react-query";
import { User } from "../entities/User";
import { UserService } from "../services/user-service";

export const useGetUser = () => {
  const userService = useGetService(UserService);

  const { isLoading, error, data, refetch } = useQuery<User, Error>({
    queryKey: ["user"],
    queryFn: () => {
      return userService.getUser("");
    },
  });

  return { user: data, isLoading, error, refetch };
};

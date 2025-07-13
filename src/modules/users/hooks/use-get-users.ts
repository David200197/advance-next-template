import { useGetService } from "@/modules/core/contexts/DiContext";
import { useQuery } from "@tanstack/react-query";
import { UserService } from "../services/user-service";
import { Users } from "../entities/Users";

export const useGetUsers = () => {
  const userService = useGetService(UserService);

  const {
    isLoading,
    error,
    data: users,
    refetch,
  } = useQuery<Users | null, Error>({
    queryKey: ["users"],
    queryFn: async () => {
      return userService.getUsers();
    },
  });

  return { users, isLoading, error, refetch };
};

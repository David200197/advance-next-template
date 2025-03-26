import { useContainer } from "@/modules/core/contexts/ContainerContext";
import { useQuery } from "@tanstack/react-query";
import { User } from "../model/User";
import { UserService } from "../services/user-service";

export const useGetUser = () => {
  const container = useContainer();
  const { isLoading, error, data } = useQuery<User, Error>({
    queryKey: ["user"],
    queryFn: () => {
      const userService = container.get(UserService);
      return userService.getUser("");
    },
  });

  return { user: data, isLoading, error };
};

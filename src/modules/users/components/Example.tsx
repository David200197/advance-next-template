"use client";
import { useQuery } from "@tanstack/react-query";
import { User } from "../model/User";
import { UserService } from "../services/user-service";
import { useContainer } from "@/modules/core/contexts/ContainerContext";

export const Example = () => {
  const container = useContainer();

  const { isLoading, error, data } = useQuery<User, Error>({
    queryKey: ["user"],
    queryFn: () => {
      const userService = container.get(UserService);
      return userService.getUser("");
    },
  });

  const onClick = () => {
    throw new Error("error click");
  };

  if (isLoading) return "Loading...";

  if (error) return `An error has occurred: ${error.message}`;

  return (
    <div>
      <h1>{data?.getDisplayName()}</h1>
      <button onClick={onClick}>click me</button>
    </div>
  );
};

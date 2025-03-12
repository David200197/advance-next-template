"use client";
import { useQuery } from "@tanstack/react-query";
import { User } from "../model/User";
import { fn } from "@/modules/core/interceptors/global-error-handler";
import { getUser } from "../services/user-service";

export const Example = () => {
  const { isLoading, error, data } = useQuery<User, Error>({
    queryKey: ["user"],
    queryFn: () => getUser(""),
  });

  const onClick = fn(() => {
    throw new Error("error click");
  });

  if (isLoading) return "Loading...";

  if (error) return `An error has occurred: ${error.message}`;

  return (
    <div>
      <h1>{data?.getDisplayName()}</h1>
      <button onClick={onClick}>click me</button>
    </div>
  );
};

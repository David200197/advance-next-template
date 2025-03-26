"use client";
import { useGetUser } from "../hooks/use-get-user";

export const Example = () => {
  const { isLoading, error, user } = useGetUser();

  const onClick = () => {
    throw new Error("error click");
  };

  if (isLoading) return "Loading...";

  if (error) return `An error has occurred: ${error.message}`;

  return (
    <div>
      <h1>{user?.getDisplayName()}</h1>
      <button onClick={onClick}>click me</button>
    </div>
  );
};

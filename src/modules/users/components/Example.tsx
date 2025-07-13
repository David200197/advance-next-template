"use client";

import { useGetUsers } from "../hooks/use-get-users";

export const Example = () => {
  const { isLoading, error, users } = useGetUsers();

  if (isLoading) return "Loading...";

  if (error) return `An error has occurred: ${error.message}`;

  return (
    <div>
      {users?.render((user) => (
        <p>{user.getDisplayName()}</p>
      ))}
    </div>
  );
};

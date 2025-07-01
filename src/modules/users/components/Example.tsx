"use client";

import { useGetService } from "@/modules/core/contexts/DiContext";
import { useGetUser } from "../hooks/use-get-user";
import { UserService } from "../services/user-service";

export const Example = () => {

  const userService = useGetService(UserService)

  const { isLoading, error, user, refetch } = useGetUser();

  const onUpdate = async () => {
    if (!user) return
    user?.rename("new name");
    await userService.updateUser(user)
    await refetch();
  };

  const onDelete = async () => {
    if (!user) return
    await userService.deleteUser(user);
    await refetch();
  };

  if (isLoading) return "Loading...";

  if (error) return `An error has occurred: ${error.message}`;

  return (
    <div>
      <h1>{user?.getDisplayName()}</h1>
      <button onClick={onUpdate}>update</button>
      <button onClick={onDelete}>delete</button>
    </div>
  );
};

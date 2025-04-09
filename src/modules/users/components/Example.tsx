"use client";
import { useGetUser } from "../hooks/use-get-user";

export const Example = () => {
  const { isLoading, error, user, refetch } = useGetUser();

  const onUpdate = async () => {
    await user?.update({ name: "new name" });
    await refetch();
  };

  const onDelete = async () => {
    await user?.delete();
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

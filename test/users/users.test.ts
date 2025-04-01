import { Users } from "@/modules/users/entities/Users";
import { describe, it, expect } from "vitest";
import { User } from "@/modules/users/entities/User";

describe("Users", () => {
  it("should create a Users instance with valid user data", () => {
    const userData = [
      { id: "1", name: "John Doe", email: "john.doe@example.com" },
      { id: "2", name: "Jane Doe", email: "jane.doe@example.com" },
    ];

    const users = Users.create(userData);

    expect(users).toBeInstanceOf(Users);
    expect(users).toHaveLength(2);
    expect(users[0]).toBeInstanceOf(User);
    expect(users[0].name).toBe("John Doe");
    expect(users[1].email).toBe("jane.doe@example.com");
  });

  it("should throw an error when invalid user data is provided", () => {
    const invalidUserData = [
      { id: 1, name: "John Doe" }, // Missing email
    ];

    expect(() => Users.create(invalidUserData as any)).toThrowError();
  });

  it("should handle an empty array of users", () => {
    const emptyUserData: any[] = [];

    const users = Users.create(emptyUserData);

    expect(users).toBeInstanceOf(Users);
    expect(users).toHaveLength(0);
  });
});

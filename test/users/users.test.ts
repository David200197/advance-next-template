import { Users } from "@/modules/users/entities/Users";
import { describe, it, expect } from "vitest";
import { User } from "@/modules/users/entities/User";
import { UserBuilder } from "./models/user-builder";

describe("Users", () => {
  it("should create a Users instance with valid user data", () => {
    const userData = [
      new UserBuilder()
        .withName("John Joe")
        .withId(1)
        .withEmail("john.joe@example.com")
        .schema(),
      new UserBuilder()
        .withName("Jane Joe")
        .withId(1)
        .withEmail("jane.joe@example.com")
        .schema(),
    ];

    const users = Users.create(userData);

    expect(users).toBeInstanceOf(Users);
    expect(users).toHaveLength(2);
    expect(users[0]).toBeInstanceOf(User);
    expect(users[0].name).toBe("John Joe");
    expect(users[1].email).toBe("jane.joe@example.com");
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

  it("should group users by a specified key", () => {
    const userData = [
      { id: 1, name: "John Doe", email: "john.doe@example.com" },
      { id: 2, name: "Jane Doe", email: "jane.doe@example.com" },
      { id: 3, name: "John Smith", email: "john.smith@example.com" },
    ];

    const users = Users.create(userData);

    const groupedByName = users.groupBy("name");

    expect(groupedByName).toMatchObject({
      "John Doe": [{ name: "John Doe", email: "john.doe@example.com" }],
      "Jane Doe": [{ name: "Jane Doe", email: "jane.doe@example.com" }],
      "John Smith": [{ name: "John Smith", email: "john.smith@example.com" }],
    });

    expect(groupedByName["John Doe"]).instanceOf(Users);
    expect(groupedByName["John Doe"][0]).instanceOf(User);

    const groupedByEmailDomain = users.groupBy(
      (user) => user.email.split("@")[1]
    );

    expect(groupedByEmailDomain).toMatchObject({
      "example.com": [
        { id: 1, name: "John Doe", email: "john.doe@example.com" },
        { id: 2, name: "Jane Doe", email: "jane.doe@example.com" },
        { id: 3, name: "John Smith", email: "john.smith@example.com" },
      ],
    });
  });
});

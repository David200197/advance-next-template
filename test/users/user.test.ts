import { describe, it, expect } from "vitest";
import { UserMother } from "./models/user-mother";
import { UserBuilder } from "./models/user-builder";
import { User } from "@/modules/users/entities/User";

// We recommend installing an extension to run vitest tests.

describe("User Model", () => {
  it("should create a user with valid schema", () => {
    const user = UserMother.create();
    expect(user).toBeDefined();
    expect(user.name).toBe("Example");
    expect(user.email).toBe("example@example.com");
  });

  it("should throw an error if required fields are missing", () => {
    const fn = () =>
      new User(
        new UserBuilder()
          .withId(undefined as any)
          .withEmail(undefined as any)
          .withName(undefined as any)
          .build()
      );

    expect(fn).toThrowError();
  });

  it("should validate email format", () => {
    const fn = () =>
      new User(
        new UserBuilder()
          .withId("1234567890")
          .withEmail("John Doe")
          .withName("invalid-name")
          .build()
      );

    expect(fn).toThrowError();
  });

  it("should throw an error if a field is modified", () => {
    const fn = () => {
      const user = new User(UserMother.create());
      user.email = "Jane Doe";
    };
    expect(fn).toThrowError();
  });
});

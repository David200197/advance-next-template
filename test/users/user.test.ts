import { User } from "@/modules/users/entities/User";
import { describe, it, expect } from "vitest";

// We recommend installing an extension to run vitest tests.

describe("User Model", () => {
  it("should create a user with valid schema", () => {
    const user = new User({
      name: "John Doe",
      email: "john.doe@example.com",
      id: "1234567890",
    });
    expect(user).toBeDefined();
    expect(user.name).toBe("John Doe");
    expect(user.email).toBe("john.doe@example.com");
  });

  it("should throw an error if required fields are missing", () => {
    expect(() => new User({} as any)).toThrowError();
  });

  it("should validate email format", () => {
    expect(() =>
      new User({ name: "John Doe", email: "invalid-email" } as any)
    ).toThrowError();
  });

  it("should allow updating user properties", () => {
    const user = new User({
      name: "John Doe",
      email: "john.doe@example.com",
      id: "1234567890",
    });
    user.name = "Jane Doe";
    expect(user.name).toBe("Jane Doe");
  });
});

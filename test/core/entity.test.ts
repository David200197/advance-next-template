import { describe, it, expect } from "vitest";
import { User } from "./models/user";

describe("Entity Decorator", () => {
  it("should validate input data during instantiation", () => {
    const user = new User({
      name: "John",
      age: 30,
      email: "john@example.com",
      id: "1234567890",
    });
    expect(user.name).toBe("John");
    expect(user.age).toBe(30);
    expect(user).toBeInstanceOf(User);
  });

  it("should throw an error for invalid input data during instantiation", () => {
    expect(() => new User({ name: "John" } as any)).toThrow();
  });

  it("should validate property updates", () => {
    const user = new User({
      name: "John",
      age: 30,
      email: "john@example.com",
      id: "1234567890",
    });

    user.name = "Jane"; // Valid update
    expect(user.name).toBe("Jane");

    expect(() => {
      user.age = "thirty" as any; // Invalid update
    }).toThrow();
  });

  it("should allow valid property updates", () => {
    const user = new User({
      name: "John",
      age: 30,
      email: "john@example.com",
      id: "1234567890",
    });
    user.age = 35; // Valid update
    expect(user.age).toBe(35);
  });
});

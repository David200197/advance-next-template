import { Entities } from "@/modules/core/decorators/Entities";
import { describe, it, expect } from "vitest";
import { Collection } from "@/modules/core/lib/Collection";
import { User, UserSchema } from "./models/user";

@Entities()
export class Users extends Collection<User> {
  constructor(...users: User[]) {
    super(...users);
  }

  static create(data: UserSchema[]) {
    return new this(...data.map((user) => new User(user)));
  }
}

describe("Entities Decorator", () => {
  it("should validate constructor arguments against the schema", () => {
    const usersSchema: UserSchema[] = [
      { age: 30, email: "dark@dark.com", name: "dark", id: "1" },
    ];
    const users = Users.create(usersSchema);

    expect(users).toEqual(usersSchema);
    expect(users).toBeInstanceOf(Users);
    expect(users[0]).toBeInstanceOf(User);
  });

  it("should throw an error for invalid constructor arguments", () => {
    const invalidUsers = "invalid";
    expect(() => Users.create(invalidUsers as any)).toThrowError();
  });

  it("should allow empty arrays as valid arguments", () => {
    const validUsers: UserSchema[] = [];
    const instance = Users.create(validUsers);
    expect(instance).toEqual(validUsers);
  });

  it("should throw an error if no arguments are provided", () => {
    expect(() => Users.create({} as any)).toThrowError();
  });

  it("should throw an error if change value", () => {
    const usersSchema: UserSchema[] = [
      { age: 30, email: "dark@dark.com", name: "dark", id: "1" },
    ];
    expect(() => {
      const users = Users.create(usersSchema);
      users[0].age = "wrong" as any;
    }).toThrowError();
  });
});

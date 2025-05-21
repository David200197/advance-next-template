import type { Mocked } from "@suites/doubles.vitest";
import { TestBed } from "@suites/unit";
import { UserService } from "@/modules/users/services/user-service";
import { it, describe, beforeAll, expect } from "vitest";
import { UserMother } from "./models/user-mother";
import { UserSchemaMother } from "./models/user-schema-mother";
import { UserFactory } from "@/modules/users/services/user-factory";

describe("User Service", () => {
  let userService: UserService;
  let userFactory: Mocked<UserFactory>;

  beforeAll(async () => {
    const { unit, unitRef } = await TestBed.solitary(UserService).compile();
    userService = unit;
    userFactory = unitRef.get(UserFactory) as unknown as Mocked<UserFactory>;
  });

  it("should get a user", async () => {
    const userSchema = UserSchemaMother.create();
    const user = UserMother.create();
    userFactory.createUser.mockResolvedValue(userSchema as any);
    const result = await userService.getUser(0);
    expect(result).toEqual(user);
  });
});

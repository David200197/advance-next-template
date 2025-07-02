import type { Mocked } from "@suites/doubles.vitest";
import { TestBed } from "@suites/unit";
import { UserService } from "@/modules/users/services/user-service";
import { it, describe, beforeAll, expect } from "vitest";
import { UserMother } from "./models/user-mother";
import { UserSchemaMother } from "./models/user-schema-mother";
import { USER_DI } from "@/modules/users/di/constants";
import { UserValidator } from "@/modules/users/models/UserValidator";

describe("User Service", () => {
  let userService: UserService;
  let userFactory: Mocked<UserValidator>;

  beforeAll(async () => {
    const { unit, unitRef } = await TestBed.solitary(UserService).compile();
    userService = unit;
    userFactory = unitRef.get(
      USER_DI.VALIDATOR
    ) as unknown as Mocked<UserValidator>;
  });

  it("should get a user", async () => {
    const userSchema = UserSchemaMother.create();
    const user = UserMother.create();
    userFactory.validateGetUserResponse.mockImplementation(() => userSchema);
    const result = await userService.getUser(0);
    expect(result).toEqual(user);
  });
});

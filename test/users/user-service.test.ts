import type { Mocked } from "@suites/doubles.vitest";
import { TestBed } from "@suites/unit";
import { UserService } from "@/modules/users/services/user-service";
import { it, describe, beforeAll, expect } from "vitest";
import { UserMother } from "./models/user-mother";
import { UserSchemaMother } from "./models/user-schema-mother";
import { UserValidation } from "@/modules/users/services/user-validation";

describe("User Service", () => {
  let userService: UserService;
  let userFactory: Mocked<UserValidation>;

  beforeAll(async () => {
    const { unit, unitRef } = await TestBed.solitary(UserService).compile();
    userService = unit;
    userFactory = unitRef.get(
      UserValidation
    ) as unknown as Mocked<UserValidation>;
  });

  it("should get a user", async () => {
    const userSchema = UserSchemaMother.create();
    const user = UserMother.create();
    userFactory.validateUser.mockImplementation(() => userSchema);
    const result = await userService.getUser(0);
    expect(result).toEqual(user);
  });
});

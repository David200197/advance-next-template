import type { Mocked } from "@suites/doubles.vitest";
import { TestBed } from "@suites/unit";
import { UserService } from "@/modules/users/services/user-service";
import { it, describe, beforeAll, expect } from "vitest";
import { HttpClient } from "@/modules/core/models/HttpClient";
import { UserMother } from "./models/user-mother";
import { CORE_DI } from "@/modules/core/constants/core-di";
import { UserSchemaMother } from "./models/user-schema-mother";

describe("User Service", () => {
  let userService: UserService;
  let httpClient: Mocked<HttpClient>;

  beforeAll(async () => {
    const { unit, unitRef } = await TestBed.solitary(UserService).compile();
    userService = unit;
    httpClient = unitRef.get<HttpClient>(
      CORE_DI.HTTP_CLIENT
    ) as unknown as Mocked<HttpClient>;
  });

  it("should get a user", async () => {
    const userSchema = UserSchemaMother.create();
    const user = UserMother.create();
    httpClient.get.mockResolvedValue(userSchema);
    const result = await userService.getUser("id");
    expect(result).toEqual(user);
  });
});

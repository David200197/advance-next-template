import { Injectable } from "@/modules/core/decorators/Injectable";
import { ZodValidator } from "@/modules/core/services/zod-validator";
import { z } from "zod";
import { GetUserResponseDTO } from "../dtos/GetUserResponseDTO";
import { GetUsersResponseDTO } from "../dtos/GetUsersResponseDTO";
import { UserValidator } from "../models/UserValidator";

const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});

const usersSchema = z.array(userSchema);

@Injectable()
export class ZodUserValidator implements UserValidator {
  constructor(private readonly zodValidator: ZodValidator) {}

  validateGetUserResponse(data: GetUserResponseDTO) {
    return this.zodValidator.validate("GetUserResponseDTO", userSchema, data);
  }

  validateGetUsersResponse(data: GetUsersResponseDTO) {
    return this.zodValidator.validate("GetUsersResponseDTO", usersSchema, data);
  }
}

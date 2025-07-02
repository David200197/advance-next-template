import { GetUserResponseDTO } from "../dtos/GetUserResponseDTO";
import { GetUsersResponseDTO } from "../dtos/GetUsersResponseDTO";

export interface UserValidator {
  validateGetUserResponse(data: GetUserResponseDTO): GetUserResponseDTO;
  validateGetUsersResponse(data: GetUsersResponseDTO): GetUsersResponseDTO;
}

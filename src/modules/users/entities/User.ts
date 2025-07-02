import type { GetUserResponseDTO } from "../dtos/GetUserResponseDTO";

export class User implements GetUserResponseDTO {
  id!: number;
  name!: string;
  email!: string;

  constructor(data: GetUserResponseDTO) {
    Object.assign(this, data);
  }

  getDisplayName() {
    return `${this.name} (${this.email})`;
  }

  rename(name: string) {
    this.name = name;
  }
}

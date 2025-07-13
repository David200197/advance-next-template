import type { GetUserResponseDTO } from "../dtos/GetUserResponseDTO";

export class User {
  readonly id: string;
  private name: string;
  private email: string;

  constructor(data: GetUserResponseDTO) {
    this.id = data.id.toString();
    this.name = data.name;
    this.email = data.email;
  }

  getDisplayName() {
    return `${this.name} (${this.email})`;
  }

  rename(name: string) {
    this.name = name;
  }
}

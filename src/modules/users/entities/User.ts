import { UserSchema } from "./UserSchema";

export class User implements UserSchema {
  id!: number;
  name!: string;
  email!: string;

  constructor(data: UserSchema) {
    Object.assign(this, data);
  }

  getDisplayName() {
    return `${this.name} (${this.email})`;
  }

  rename(name: string) {
    this.name = name;
  }
}

import { UserBuilder } from "./user-builder";

export class UserSchemaMother {
  static create() {
    return new UserBuilder().schema();
  }
  static createWithoutEmail() {
    return new UserBuilder().withEmail("").schema();
  }
}

import { UserBuilder } from "./user-builder";

export class UserSchemaMother {
  static create() {
    return new UserBuilder().getDto();
  }
  static createWithoutEmail() {
    return new UserBuilder().withEmail("").getDto();
  }
}

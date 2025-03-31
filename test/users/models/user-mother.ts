import { UserBuilder } from "./user-builder";

export class UserMother {
  static create() {
    return new UserBuilder().build()
  }
  static createWithoutEmail() {
    return new UserBuilder().withEmail("").build()
  }
}

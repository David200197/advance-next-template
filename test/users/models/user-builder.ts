import { User, UserSchema } from "@/modules/users/entities/User";

export class UserBuilder implements UserSchema {
  id!: string;
  name!: string;
  email!: string;

  constructor() {
    this.reset();
  }

  reset(): this {
    this.id = "123";
    this.name = "Example";
    this.email = "example@example.com";
    return this;
  }

  withId(id: string): this {
    this.id = id;
    return this;
  }

  withName(name: string): this {
    this.name = name;
    return this;
  }

  withEmail(email: string): this {
    this.email = email;
    return this;
  }

  schema(): UserSchema {
    return this;
  }

  build(): User {
    return new User(this)
  }
}

import { User } from "@/modules/users/entities/User";
import { UserSchema } from "@/modules/users/entities/UserSchema";

export class UserBuilder implements UserSchema {
  id!: number;
  name!: string;
  email!: string;

  constructor() {
    this.reset();
  }

  reset(): this {
    this.id = 123;
    this.name = "Example";
    this.email = "example@example.com";
    return this;
  }

  withId(id: number): this {
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
    return new User(this);
  }
}

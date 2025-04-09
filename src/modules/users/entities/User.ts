import { Entity } from "@/modules/core/decorators/Entity";
import { HttpClient } from "@/modules/core/models/HttpClient";
import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});

export type UserSchema = z.infer<typeof userSchema>;

@Entity(userSchema)
export class User implements UserSchema {
  private httpClient!: HttpClient;

  injectDependencies(httpClient: HttpClient) {
    if (!this.httpClient) this.httpClient = httpClient;
  }

  id!: number;
  name!: string;
  email!: string;

  constructor(data: UserSchema) {
    Object.assign(this, data);
  }

  getDisplayName() {
    return `${this.name} (${this.email})`;
  }

  async update(data: Partial<UserSchema>) {
    await this.httpClient.put(`/users/${this.id}`, data);
  }

  async delete() {
    await this.httpClient.delete(`/users/${this.id}`);
  }
}

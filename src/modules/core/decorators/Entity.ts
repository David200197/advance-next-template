import { ZodObject } from "zod";
import { validateSchema } from "../utils/validate-model-schema";

type Constructor = new (...args: any[]) => {};

/**
 * A class decorator that enforces validation of input data against a Zod schema.
 * This validation occurs during the instantiation of the decorated class and
 * whenever a property of the class is updated.
 *
 * @template T - The type of the Zod schema, which must be a `ZodObject`.
 * @param schema - The Zod schema used to validate the input data.
 *
 * @returns A class decorator that extends the original class to include schema validation.
 *
 * @remarks
 * - The first argument passed to the constructor is validated against the schema.
 * - Property updates are also validated to ensure they conform to the schema.
 * - If validation fails, an error is thrown.
 *
 * @example
 * ```typescript
 * import { z } from "zod";
 * import { Entity } from "./Entity";
 *
 * const UserSchema = z.object({
 *   name: z.string(),
 *   age: z.number(),
 * });
 *
 * @Entity(UserSchema)
 * class User {
 *   constructor(public data: { name: string; age: number }) {}
 * }
 *
 * const user = new User({ name: "John", age: 30 }); // Valid
 * user.data.name = "Jane"; // Valid
 * user.data.age = "thirty"; // Throws validation error
 *
 * const invalidUser = new User({ name: "John" }); // Throws validation error
 * ```
 */

export function Entity<T extends ZodObject<any>>(schema: T) {
  return function <TClass extends Constructor>(constructor: TClass) {
    return class extends constructor {
      constructor(...args: any[]) {
        const validated = validateSchema(constructor.name, schema, args[0]);
        args[0] = validated
        super(...args);

        const proxy = new Proxy(this, {
          set(target, prop, value) {
            if (prop in target) {
              const tempData = { ...target, [prop]: value };
              validateSchema(constructor.name, schema, tempData);
            }
            target[prop as keyof typeof target] = value;
            return true;
          },
        });

        return proxy;
      }
    };
  };
}

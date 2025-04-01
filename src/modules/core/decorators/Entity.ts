import { ZodArray, ZodObject } from "zod";
import { validateSchema } from "../utils/validate-model-schema";

type ZodData = ZodObject<any> | ZodArray<any>;
type Constructor = new (...args: any[]) => {};

/**
 * A decorator function that validates the input data against a Zod schema
 * when an instance of the decorated class is created or when a property is updated.
 *
 * @template T - The type of the Zod schema, which can be either a `ZodObject` or a `ZodArray`.
 * @param schema - The Zod schema used to validate the input data.
 *
 * @returns A class decorator that extends the original class and performs schema validation
 *          on the first argument passed to the constructor and on property updates.
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
 *   constructor(public data: { name: string; age: number }) {...}
 * }
 *
 * const user = new User({ name: "John", age: 30, id: "123" }); // Valid
 * user.name = "Jane"; // Valid
 * user.age = "thirty"; // Throws validation error
 * 
 * const user2 = new User({ name: "John", age: 30 }); // Throws validation error
 * ```
 */
export function Entity<T extends ZodData>(schema: T) {
  return function <TClass extends Constructor>(constructor: TClass) {
    return class extends constructor {
      constructor(...args: any[]) {
        validateSchema(constructor.name, schema, args[0]);
        super(...args);

        return new Proxy(this, {
          set(target, prop, value) {
            if (prop in target) {
              const tempData = { ...target, [prop]: value };
              validateSchema(constructor.name, schema, tempData);
            }
            target[prop as keyof typeof target] = value;
            return true;
          },
        });
      }
    };
  };
}

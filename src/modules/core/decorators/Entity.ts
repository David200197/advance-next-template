import { ZodArray, ZodObject } from "zod";
import { validateSchema } from "../utils/validate-model-schema";

type ZodData = ZodObject<any> | ZodArray<any>;
type Constructor = new (...args: any[]) => {};

/**
 * A decorator function that validates the input data against a Zod schema
 * when an instance of the decorated class is created.
 *
 * @template T - The type of the Zod schema, which can be either a `ZodObject` or a `ZodArray`.
 * @param schema - The Zod schema used to validate the input data.
 *
 * @returns A class decorator that extends the original class and performs schema validation
 *          on the first argument passed to the constructor.
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
 * const invalidUser = new User({ name: "John", age: "thirty" }); // Throws validation error
 * ```
 */
export function Entity<T extends ZodData>(schema: T) {
  return function <TClass extends Constructor>(constructor: TClass) {
    return class extends constructor {
      constructor(...args: any[]) {
        validateSchema(constructor.name, schema, args[0]);
        super(...args);
      }
    };
  };
}

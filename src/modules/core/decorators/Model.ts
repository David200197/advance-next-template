import { ZodArray, ZodObject } from "zod";
import { validateSchema } from "../utils/validate-model-schema";

type ZodData = ZodObject<any> | ZodArray<any>;

/**
 * A class decorator that validates the schema of a class instance
 * using a provided Zod schema. This decorator ensures that the
 * class instance adheres to the specified schema during instantiation.
 *
 * @template T - The type of the Zod schema, which can be either a `ZodObject` or `ZodArray`.
 * @param schema - The Zod schema used to validate the class instance.
 *
 * @returns A class decorator function that wraps the original class constructor
 *          to perform schema validation on the constructor arguments.
 *
 * @example
 * ```typescript
 * import { z } from "zod";
 * import { Model } from "./Model";
 *
 * const UserSchema = z.object({
 *   name: z.string(),
 *   age: z.number(),
 * });
 *
 * @Model(UserSchema)
 * class User {
 *   constructor(public name: string, public age: number) {}
 * }
 *
 * const user = new User("John", 30); // Valid
 * const invalidUser = new User("John", "thirty"); // Throws validation error
 * ```
 */
export function Model<T extends ZodData>(schema: T): ClassDecorator {
  return function (target: any) {
    const originalConstructor = target;

    function newConstructor(args: any) {
      validateSchema(originalConstructor.name, schema, args);
      return new originalConstructor(args);
    }

    // clone the class decorator
    newConstructor.prototype = Object.create(originalConstructor.prototype);

    // clone the static methods
    Object.getOwnPropertyNames(originalConstructor).forEach((prop) => {
      Object.defineProperty(
        newConstructor,
        prop,
        Object.getOwnPropertyDescriptor(originalConstructor, prop)!
      );
    });

    Object.defineProperty(newConstructor, "name", {
      value: originalConstructor.name,
      writable: false,
    });

    return newConstructor as any;
  };
}

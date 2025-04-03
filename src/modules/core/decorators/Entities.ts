import { z } from "zod";
import { validateSchema } from "../utils/validate-model-schema";
import { Constructor } from "../models/Constructor";

const arraySchema = z.array(z.any());

/**
 * A decorator function that validates the arguments passed to a class constructor
 * against a predefined Zod array schema. If the validation fails, an error is thrown.
 *
 * @returns A class decorator that extends the original class and adds validation logic
 *          to its constructor.
 *
 * @template TClass - The type of the class being decorated.
 *
 * @example
 * ```typescript
 * @Entities()
 * class MyClass {
 *   constructor(data: any[]) {
 *     // Constructor logic
 *   }
 * }
 *
 * // When creating an instance of MyClass, the arguments will be validated
 * // against the `arraySchema` defined in this decorator.
 * const instance = new MyClass([1, 2, 3]); // Valid
 * const invalidInstance = new MyClass("invalid"); // Throws validation error
 * ```
 */
export function Entities() {
  return function <TClass extends Constructor>(constructor: TClass) {
    return class extends constructor {
      constructor(...args: any[]) {
        const validated = validateSchema(constructor.name, arraySchema, args);
        super(...validated);
      }
    };
  };
}

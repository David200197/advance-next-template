import { ZodArray, ZodObject } from "zod";
import { validateSchema } from "../utils/validate-model-schema";

type ZodData = ZodObject<any> | ZodArray<any>;
type Constructor = new (...args: any[]) => {};

export function Entity<T extends ZodData>(schema: T) {
  return function <TClass extends Constructor>(constructor: TClass) {
    return class extends constructor {
      constructor(...args: any[]) {
        validateSchema(constructor.name, schema, args[0]);
        super(...args);
      }

      toJSON() {
        return JSON.stringify(this);
      }
    };
  };
}

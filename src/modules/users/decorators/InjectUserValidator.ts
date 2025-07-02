import { Inject } from "@/modules/core/decorators/Inject";
import { USER_DI } from "../di/constants";

export const InjectUserValidator = () => Inject(USER_DI.VALIDATOR);

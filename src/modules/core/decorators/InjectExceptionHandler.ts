import { inject } from "inversify";
import { CORE_DI } from "../di/types";

export const InjectExceptionHandler = () => inject(CORE_DI.EXCEPTION_HANDLER);

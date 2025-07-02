import { inject } from "inversify";
import { CORE_DI } from "../di/constants";

export const InjectExceptionHandler = () => inject(CORE_DI.EXCEPTION_HANDLER);

import { inject } from "inversify";
import { CORE_DI } from "../constants/core-di";

export const injectExceptionHandler = () => inject(CORE_DI.EXCEPTION_HANDLER);

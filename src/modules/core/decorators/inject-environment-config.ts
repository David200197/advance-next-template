import { inject } from "inversify";
import { CORE_DI } from "../constants/core-di";

export const injectEnvironmentConfig = () => inject(CORE_DI.ENVIRONMENT_CONFIG);

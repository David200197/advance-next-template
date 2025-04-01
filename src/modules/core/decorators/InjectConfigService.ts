import { inject } from "inversify";
import { CORE_DI } from "../constants/core-di";

export const InjectConfigService = () => inject(CORE_DI.CONFIG_SERVICE);

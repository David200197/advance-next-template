import { inject } from "inversify";
import { CORE_DI } from "../di/types";

export const InjectConfigService = () => inject(CORE_DI.CONFIG_SERVICE);

import { inject } from "inversify";
import { CORE_DI } from "../di/types";

export const InjectHttpClient = () => inject(CORE_DI.HTTP_CLIENT);

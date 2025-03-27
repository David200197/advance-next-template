import { inject } from "inversify";
import { CORE_DI } from "../constants/core-di";

export const injectHttpClient = () => inject(CORE_DI.HTTP_CLIENT);

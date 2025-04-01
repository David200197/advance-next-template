import { inject } from "inversify";
import { CORE_DI } from "../constants/core-di";

export const InjectHttpClient = () => inject(CORE_DI.HTTP_CLIENT);

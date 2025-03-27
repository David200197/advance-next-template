import { HttpAxiosClient } from "../services/http-client-axios";
import { HttpClient } from "../models/HttpClient";
import { ExceptionHandler } from "../interceptors/exception-handler";
import { ExceptionHandlerModel } from "../models/ErrorHandler";
import { ContainerModule, ContainerModuleLoadOptions } from "inversify";
import { CORE_DI } from "../constants/core-di";

const load = (options: ContainerModuleLoadOptions) => {
  options
    .bind<ExceptionHandlerModel>(CORE_DI.EXCEPTION_HANDLER)
    .to(ExceptionHandler)
    .inSingletonScope();
  options
    .bind<HttpClient>(CORE_DI.HTTP_CLIENT)
    .to(HttpAxiosClient)
    .inSingletonScope();
};

export const CoreModule = new ContainerModule(load);

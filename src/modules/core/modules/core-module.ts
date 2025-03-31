import { HttpClientAxios } from "../services/http-client-axios";
import { HttpClient } from "../models/HttpClient";
import { ExceptionHandler } from "../interceptors/exception-handler";
import { ExceptionHandlerModel } from "../models/ErrorHandler";
import { ContainerModule } from "inversify";
import { CORE_DI } from "../constants/core-di";
import { EnvironmentConfig } from "../services/environment-config";

export const CoreModule = new ContainerModule((bind) => {
  bind<ExceptionHandlerModel>(CORE_DI.EXCEPTION_HANDLER).to(ExceptionHandler);
  bind<HttpClient>(CORE_DI.HTTP_CLIENT).to(HttpClientAxios);
  bind(CORE_DI.ENVIRONMENT_CONFIG).to(EnvironmentConfig);
});

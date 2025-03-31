import { HttpClientAxios } from "../services/http-client-axios";
import { HttpClient } from "../models/HttpClient";
import { ExceptionHandler } from "../interceptors/exception-handler";
import { ExceptionHandlerModel } from "../models/ErrorHandler";
import { Container } from "inversify";
import { CORE_DI } from "../constants/core-di";
import { EnvironmentConfig } from "../services/environment-config";

export const CoreModule = (container: Container) => {
  container
    .bind<ExceptionHandlerModel>(CORE_DI.EXCEPTION_HANDLER)
    .to(ExceptionHandler)
    .inSingletonScope();
  container
    .bind<HttpClient>(CORE_DI.HTTP_CLIENT)
    .to(HttpClientAxios)
    .inSingletonScope();
  container
    .bind(CORE_DI.ENVIRONMENT_CONFIG)
    .to(EnvironmentConfig)
    .inSingletonScope();
};

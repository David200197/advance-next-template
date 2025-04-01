import { HttpClientAxios } from "../services/http-client-axios";
import { HttpClient } from "../models/HttpClient";
import { ExceptionHandler } from "../interceptors/exception-handler";
import { ExceptionHandlerModel } from "../models/ErrorHandler";
import { ContainerModule } from "inversify";
import { CORE_DI } from "../constants/core-di";
import { ConfigService } from "../services/config-service";

export const CoreModule = new ContainerModule((bind) => {
  bind<ExceptionHandlerModel>(CORE_DI.EXCEPTION_HANDLER).to(ExceptionHandler);
  bind<HttpClient>(CORE_DI.HTTP_CLIENT).to(HttpClientAxios);
  bind(CORE_DI.CONFIG_SERVICE).to(ConfigService);
});

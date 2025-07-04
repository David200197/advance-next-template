import { HttpClientAxios } from "../services/http-client-axios";
import { HttpClient } from "../models/HttpClient";
import { ExceptionHandler } from "../interceptors/exception-handler";
import { ExceptionHandlerModel } from "../models/ErrorHandler";
import { ContainerModule } from "inversify";
import { CORE_DI } from "./constants";
import { ConfigService } from "../services/config-service";
import { ZodValidator } from "../services/zod-validator";
import { HttpResponseInterceptor } from "../interceptors/http-response.interceptor";
import { HttpErrorInterceptor } from "../interceptors/http-error.interceptor";

export const CoreModule = new ContainerModule((bind) => {
  bind<ExceptionHandlerModel>(CORE_DI.EXCEPTION_HANDLER).to(ExceptionHandler);
  bind<HttpClient>(CORE_DI.HTTP_CLIENT).to(HttpClientAxios);
  bind(CORE_DI.CONFIG_SERVICE).to(ConfigService);
  bind(ZodValidator).toSelf();
  bind(HttpResponseInterceptor).toSelf();
  bind(HttpErrorInterceptor).toSelf();
});

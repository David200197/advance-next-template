import "reflect-metadata";
import { Container } from "inversify";
import { UserService } from "@/modules/users/services/user-service";
import { HttpAxiosClient } from "../services/http-client-axios";
import { HttpClient } from "../models/HttpClient";
import { HTTP_CLIENT } from "../constants/client-http-constants";
import { EXCEPTION_HANDLER } from "../constants/exception-handler-constants";
import { ExceptionHandler } from "../interceptors/exception-handler";
import { ExceptionHandlerModel } from "../models/ErrorHandler";

const container = new Container();

container.bind<ExceptionHandlerModel>(EXCEPTION_HANDLER).to(ExceptionHandler);
container.bind<HttpClient>(HTTP_CLIENT).to(HttpAxiosClient);
container.bind(UserService).to(UserService);

export default container;

import { ErrorInfo } from "react";
import { ExceptionHandlerModel } from "../models/ErrorHandler";
import { injectable } from "inversify";

@injectable()
export class ExceptionHandler implements ExceptionHandlerModel {
  handle(error: Error, errorInfo?: ErrorInfo): void | Promise<void> {
    console.error("Error capturado:", error.message, errorInfo);
  }
}

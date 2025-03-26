import { ErrorInfo } from "react";

export interface ExceptionHandlerModel {
  handle(error: Error, errorInfo?: ErrorInfo): void | Promise<void>;
}

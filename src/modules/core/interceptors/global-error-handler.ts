"use client";
import { ErrorInfo } from "react";
import { createErrorInterceptors } from "../lib/create-error-interceptors";

function globalErrorHandler(error: Error, errorInfo?: ErrorInfo): void {
  console.error("Error capturado:", error.message);
}

export const { fn, ErrorBoundary } =
  createErrorInterceptors(globalErrorHandler);

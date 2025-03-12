import { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

// State del ErrorBoundary
interface ErrorBoundaryState {
  hasError: boolean;
}

export const createErrorInterceptors = (
  errorHandler: (error: Error, errorInfo?: ErrorInfo) => Promise<void> | void
) => {
  function fn<T extends (...args: any[]) => any>(
    originalFunction: T
  ): (...args: Parameters<T>) => ReturnType<T>;

  function fn<T extends (...args: any[]) => void>(
    originalFunction: T
  ): (...args: Parameters<T>) => void;

  function fn<T extends (...args: any[]) => any>(
    originalFunction: T
  ): (...args: Parameters<T>) => ReturnType<T> | void {
    return function (...args: Parameters<T>): ReturnType<T> | void {
      try {
        return originalFunction(...args);
      } catch (error) {
        if (error instanceof Error) {
          errorHandler(error);
        } else {
          errorHandler(new Error(String(error)));
        }
      }
    };
  }

  class ErrorBoundary extends Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
  > {
    constructor(props: ErrorBoundaryProps) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error): ErrorBoundaryState {
      return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
      errorHandler(error, errorInfo);
    }

    render(): ReactNode {
      if (this.state.hasError) {
        return this.props.fallback || <h1>Something Went Wrong</h1>;
      }

      return this.props.children;
    }
  }

  return { fn, ErrorBoundary };
};

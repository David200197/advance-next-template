import { injectable } from "inversify";
import { HttpClient } from "../models/HttpClient";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { injectEnvironmentConfig } from "../decorators/inject-environment-config";
import { EnvironmentConfig } from "./environment-config";
import toast from "react-hot-toast";
import { ServerError } from "../exceptions/server-error";
import { NotFoundError } from "../exceptions/not-found-error";
import { UnauthorizedError } from "../exceptions/unathorized-error";
import { ForbiddenError } from "../exceptions/forbidden-error";
import { ApiError } from "../exceptions/api-error";
import { NetworkError } from "../exceptions/network-error";
import { UnknownError } from "../exceptions/uknown-error";

@injectable()
export class HttpClientAxios implements HttpClient {
  private readonly apiClient: AxiosInstance;
  constructor(
    @injectEnvironmentConfig()
    environmentConfig: EnvironmentConfig
  ) {
    this.apiClient = axios.create({
      baseURL: environmentConfig.get("NEXT_PUBLIC_API_URL"),
      headers: { "Content-Type": "application/json" },
    });
    this.apiClient.interceptors.response.use(
      this.responseInterceptor,
      this.errorInterceptor
    );
  }

  async get<Response>(path: string): Promise<Response> {
    const response = await this.apiClient.get(path);
    return response.data;
  }
  async post<Body, Response>(path: string, body: Body): Promise<Response> {
    const response = await this.apiClient.post(path, { body });
    return response.data;
  }
  async put<Body, Response>(path: string, body: Body): Promise<Response> {
    const response = await this.apiClient.put(path, { body });
    return response.data;
  }
  async patch<Body, Response>(path: string, body: Body): Promise<Response> {
    const response = await this.apiClient.patch(path, { body });
    return response.data;
  }
  async delete<Response>(path: string): Promise<Response> {
    const response = await this.apiClient.delete(path);
    return response.data;
  }

  private readonly responseInterceptor = (
    response: AxiosResponse<any, any>
  ) => {
    const { status, config, data } = response;

    if (status >= 400) throw response;

    const modifyingMethods = new Set(["POST", "PUT", "PATCH", "DELETE"]);
    if (modifyingMethods.has(config.method?.toUpperCase() ?? "")) {
      toast.success(data.message || "Operation carried out successfully");
    }

    return response;
  };

  private readonly errorInterceptor = (error: any) => {
    const { response, request, message } = error;

    if (response?.data?.message) {
      toast.error(response.data.message);
      throw error;
    }

    if (response) {
      const status = response.status;
      const errorMessages: Record<number, string> = {
        500: "Server error. Please try again later.",
        404: "Resource not found.",
        401: "Unauthorized. Please log in again.",
        403: "Access denied. You do not have permission.",
      };

      const errorMessage =
        errorMessages[status] ||
        response.data?.message ||
        "Unknown server error.";

      toast.error(errorMessage);
      switch (status) {
        case 500:
          throw new ServerError(errorMessage, response.data);
        case 404:
          throw new NotFoundError(errorMessage, response.data);
        case 401:
          throw new UnauthorizedError(errorMessage, response.data);
        case 403:
          throw new ForbiddenError(errorMessage, response.data);
        default:
          throw new ApiError(errorMessage, status, response.data);
      }
    }

    if (request) {
      toast.error(
        "Cannot connect to the server. Check your internet connection."
      );
      throw new NetworkError();
    }

    toast.error(message || "An unexpected error occurred.");
    throw new UnknownError(message);
  };
}

import axios from "axios";
import toast from "react-hot-toast";
import { ServerError } from "../exceptions/server-error";
import { NotFoundError } from "../exceptions/not-found-error";
import { UnauthorizedError } from "../exceptions/unathorized-error";
import { ForbiddenError } from "../exceptions/forbidden-error";
import { ApiError } from "../exceptions/api-error";
import { NetworkError } from "../exceptions/network-error";
import { UnknownError } from "../exceptions/uknown-error";
import { env } from "./env";

export const apiClient = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL ?? "https://api.example.com",
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.response.use(
  (response) => {
    const { status, config, data } = response;

    if (status >= 400) throw response;

    const modifyingMethods = new Set(["POST", "PUT", "PATCH", "DELETE"]);
    if (modifyingMethods.has(config.method?.toUpperCase() ?? "")) {
      toast.success(data.message || "Operation carried out successfully");
    }

    return response;
  },
  (error) => {
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
  }
);

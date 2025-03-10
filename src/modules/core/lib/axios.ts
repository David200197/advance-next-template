import axios from "axios";
import toast from "react-hot-toast";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "https://api.example.com",
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

      toast.error(
        errorMessages[status] ||
          response.data?.message ||
          "Unknown server error."
      );
      throw error;
    }

    if (request) {
      toast.error(
        "Cannot connect to the server. Check your internet connection."
      );
      throw error;
    }

    toast.error(message || "An unexpected error occurred.");
    throw error;
  }
);

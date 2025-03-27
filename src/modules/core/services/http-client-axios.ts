import { injectable } from "inversify";
import { HttpClient } from "../models/HttpClient";
import { apiClient } from "../lib/axios";

@injectable()
export class HttpAxiosClient implements HttpClient {
  async get<Response>(path: string): Promise<Response> {
    const response = await apiClient.get(path);
    return response.data;
  }
  async post<Body, Response>(path: string, body: Body): Promise<Response> {
    const response = await apiClient.post(path, { body });
    return response.data;
  }
  async put<Body, Response>(path: string, body: Body): Promise<Response> {
    const response = await apiClient.put(path, { body });
    return response.data;
  }
  async patch<Body, Response>(path: string, body: Body): Promise<Response> {
    const response = await apiClient.patch(path, { body });
    return response.data;
  }
  async delete<Response>(path: string): Promise<Response> {
    const response = await apiClient.delete(path);
    return response.data;
  }
}

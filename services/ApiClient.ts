import axios, { AxiosResponse } from "axios";

import { ApiHeaders, ApiResponse, ErrorResponse } from "@/types/apiTypes";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

class ApiClient {
  // **** Attributs
  private static token: string | null = null;

  // **** Setters
  static setToken(token: string | null) {
    this.token = token;
  }

  // **** Getters
  private static getHeaders(): ApiHeaders {
    return {
      "Content-Type": "application/json",
      Authorization: this.token ? `Bearer ${this.token}` : "",
    };
  }
  // **** Méthodes statiques

  static async apiRequest<T>(
    method: string,
    url: string,
    body: object = {},
  ): Promise<ApiResponse<T> | ApiResponse<ErrorResponse>> {
    const urlToUse = BASE_URL + url;

    try {
      const response: AxiosResponse<T> = await axios({
        method,
        url: urlToUse,
        data: body,
        headers: this.getHeaders(),
      });

      return { status: response.status, data: response.data };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          status: error.response?.status || 500,
          data: {
            error: true,
            message:
              error.response?.data.message || "Une erreur s'est produite.",
          } as ErrorResponse,
        };
      } else {
        return {
          status: 500,
          data: {
            error: true,
            message: "Erreur interne",
          } as ErrorResponse,
        };
      }
    }
  }

  static get<T>(
    url: string,
  ): Promise<ApiResponse<T> | ApiResponse<ErrorResponse>> {
    return this.apiRequest<T>("GET", url);
  }

  static post<T>(
    url: string,
    data: object,
  ): Promise<ApiResponse<T> | ApiResponse<ErrorResponse>> {
    return this.apiRequest<T>("POST", url, data);
  }

  static patch<T>(
    url: string,
    data?: object,
  ): Promise<ApiResponse<T> | ApiResponse<ErrorResponse>> {
    return this.apiRequest<T>("PATCH", url, data);
  }

  static delete<T>(
    url: string,
  ): Promise<ApiResponse<T> | ApiResponse<ErrorResponse>> {
    return this.apiRequest<T>("DELETE", url);
  }
}

export default ApiClient;

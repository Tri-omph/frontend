import axios, { AxiosResponse } from "axios";

import { ApiHeaders, ApiResponse, ErrorResponse } from "@/types/apiTypes";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

function getHeaders(token: string): ApiHeaders {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    //'App-Key': App_Key, TODO: à statuer avec le back
  };
}

class ApiClient {
  static async apiRequest<T>(
    method: string,
    url: string,
    token: string,
    body: object = {},
  ): Promise<ApiResponse<T> | ApiResponse<ErrorResponse>> {
    const urlToUse = BASE_URL + url;

    try {
      const response: AxiosResponse<T> = await axios({
        method,
        url: urlToUse,
        data: body,
        headers: getHeaders(token),
      });

      return { status: response.status, data: response.data };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          status: error.response?.status || 500,
          data: {
            message:
              error.response?.data.message || "Une erreur s'est produite.",
            details: error.response?.data.details || "",
          } as ErrorResponse,
        };
      } else {
        return {
          status: 500,
          data: {
            message: "Erreur interne du serveur.",
            details: "",
          } as ErrorResponse,
        };
      }
    }
  }

  static get<T>(
    url: string,
    token: string,
  ): Promise<ApiResponse<T> | ApiResponse<ErrorResponse>> {
    return this.apiRequest<T>("GET", url, token);
  }

  static post<T>(
    url: string,
    token: string,
    data: object,
  ): Promise<ApiResponse<T> | ApiResponse<ErrorResponse>> {
    return this.apiRequest<T>("POST", url, token, data);
  }

  static patch<T>(
    url: string,
    token: string,
    data: object,
  ): Promise<ApiResponse<T> | ApiResponse<ErrorResponse>> {
    return this.apiRequest<T>("PATCH", url, token, data);
  }

  static delete<T>(
    url: string,
    token: string,
  ): Promise<ApiResponse<T> | ApiResponse<ErrorResponse>> {
    return this.apiRequest<T>("DELETE", url, token);
  }
}

export default ApiClient;

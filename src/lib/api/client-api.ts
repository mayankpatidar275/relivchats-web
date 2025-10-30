import { env } from "../env.client";
import {
  ApiError,
  UnauthorizedError,
  ForbiddenError,
  ValidationError,
  NotFoundError,
  ServerError,
} from "./errors";
import type { ApiErrorResponse, RequestConfig } from "./types";

class ClientApiClient {
  private baseURL: string;
  private getToken: (() => Promise<string | null>) | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  // This will be called to set the token getter function
  setTokenGetter(getToken: () => Promise<string | null>) {
    this.getToken = getToken;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get("content-type");
    const isJson = contentType?.includes("application/json");

    if (!response.ok) {
      const errorData: ApiErrorResponse | null = isJson
        ? await response.json().catch(() => null)
        : null;

      const errorMessage = this.extractErrorMessage(errorData);

      switch (response.status) {
        case 401:
          throw new UnauthorizedError(errorMessage);
        case 403:
          throw new ForbiddenError(errorMessage);
        case 404:
          throw new NotFoundError(errorMessage);
        case 422:
          throw new ValidationError(
            errorMessage,
            this.extractValidationErrors(errorData)
          );
        case 500:
        case 502:
        case 503:
        case 504:
          throw new ServerError(errorMessage);
        default:
          throw new ApiError(errorMessage, response.status);
      }
    }

    if (response.status === 204 || !isJson) {
      return {} as T;
    }

    return response.json();
  }

  private extractErrorMessage(errorData: ApiErrorResponse | null): string {
    if (!errorData) return "An error occurred";

    if (typeof errorData.detail === "string") {
      return errorData.detail;
    }

    if (Array.isArray(errorData.detail) && errorData.detail.length > 0) {
      return errorData.detail[0].msg;
    }

    return errorData.message || "An error occurred";
  }

  private extractValidationErrors(
    errorData: ApiErrorResponse | null
  ): Record<string, string[]> | undefined {
    if (
      !errorData ||
      typeof errorData.detail !== "object" ||
      !Array.isArray(errorData.detail)
    ) {
      return undefined;
    }

    const errors: Record<string, string[]> = {};

    for (const error of errorData.detail) {
      const field = error.type || "general";
      if (!errors[field]) {
        errors[field] = [];
      }
      errors[field].push(error.msg);
    }

    return errors;
  }

  private buildURL(
    endpoint: string,
    params?: Record<string, string | number | boolean>
  ): string {
    const url = new URL(endpoint, this.baseURL);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }
    return url.toString();
  }

  private async getAuthHeaders(): Promise<HeadersInit> {
    if (!this.getToken) {
      return {};
    }

    const token = await this.getToken();

    if (!token) {
      return {};
    }

    return {
      Authorization: `Bearer ${token}`,
    };
  }

  async request<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    const { params, headers, ...restConfig } = config;

    const url = this.buildURL(endpoint, params);
    const authHeaders = await this.getAuthHeaders();

    const defaultHeaders: HeadersInit = {
      "Content-Type": "application/json",
    };

    const response = await fetch(url, {
      ...restConfig,
      headers: {
        ...defaultHeaders,
        ...authHeaders,
        ...headers,
      },
    });

    return this.handleResponse<T>(response);
  }

  async get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: "GET" });
  }

  async post<T>(
    endpoint: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async postForm<T>(
    endpoint: string,
    formData: FormData,
    config: RequestConfig = {}
  ): Promise<T> {
    const url = this.buildURL(endpoint, config?.params);
    const authHeaders = await this.getAuthHeaders();

    const response = await fetch(url, {
      method: "POST",
      body: formData,
      headers: {
        ...authHeaders,
        ...(config?.headers || {}), // allow overriding other headers but NOT Content-Type
      },
      // include other fetch config if needed:
      ...config,
    });

    return this.handleResponse<T>(response);
  }

  async put<T>(
    endpoint: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async patch<T>(
    endpoint: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: "DELETE" });
  }
}

export const clientApi = new ClientApiClient(
  `${env.NEXT_PUBLIC_BACKEND_URL}/api/`
);

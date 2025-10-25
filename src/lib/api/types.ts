export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  detail: string | { msg: string; type: string }[];
  message?: string;
}

export interface RequestConfig extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

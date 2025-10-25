export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = "Unauthorized") {
    super(message, 401);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = "Forbidden") {
    super(message, 403);
    this.name = "ForbiddenError";
  }
}

export class ValidationError extends ApiError {
  constructor(
    message = "Validation failed",
    errors?: Record<string, string[]>
  ) {
    super(message, 422, errors);
    this.name = "ValidationError";
  }
}

export class NotFoundError extends ApiError {
  constructor(message = "Resource not found") {
    super(message, 404);
    this.name = "NotFoundError";
  }
}

export class ServerError extends ApiError {
  constructor(message = "Internal server error") {
    super(message, 500);
    this.name = "ServerError";
  }
}

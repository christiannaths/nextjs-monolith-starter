type StatusCodes = 200 | 204 | 400 | 401 | 403 | 404 | 500;
type ErrorCodes = "UNAUTHORIZED" | "NOT_FOUND" | "INTERNAL";

export interface HttpErrorResponse {
  message: string;
  status: StatusCodes;
  code: ErrorCodes;
}

export class HttpError extends Error {
  message: string;
  status: StatusCodes;
  code: ErrorCodes;

  constructor(message: string, status: StatusCodes, code: ErrorCodes) {
    super(message);
    this.message = message;
    this.status = status;
    this.code = code;
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message = "You are not authorized to perform this action") {
    super(message, 401, "UNAUTHORIZED");
  }
}

export class NotFoundError extends HttpError {
  constructor(message = "This resource was not found on the server") {
    super(message, 404, "NOT_FOUND");
  }
}

export class InternalError extends HttpError {
  constructor(message = "Internal server error") {
    super(message, 500, "INTERNAL");
  }
}

export function parseError(error: unknown): HttpErrorResponse {
  if (error instanceof HttpError) return error;
  if (error instanceof Error) return new InternalError(error.message);
  return new InternalError(String(error));
}

export class CustomAPIError extends Error {
  constructor(public message: string, public statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class BadRequestError extends CustomAPIError {
  constructor(public message: string, public statusCode: number = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class NotFoundError extends CustomAPIError {
  constructor(public message: string, public statusCode: number = 404) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class UnauthenticatedError extends CustomAPIError {
  constructor(public message: string, public statusCode: number = 401) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class Unauthorized extends CustomAPIError {
  constructor(public message: string, public statusCode: number = 403) {
    super(message);
    this.statusCode = statusCode;
  }
}

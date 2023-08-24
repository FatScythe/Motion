export class CustomAPIError extends Error {
  constructor(public message: string) {
    super(message);
  }
}

export class BadRequestError extends CustomAPIError {
  constructor(public message: string, public code: number) {
    super(message);
    this.code = 400;
  }
}

export class NotFoundError extends CustomAPIError {
  constructor(public message: string, public code: number) {
    super(message);
    this.code = 404;
  }
}

export class UnauthenticatedError extends CustomAPIError {
  constructor(public message: string, public code: number) {
    super(message);
    this.code = 401;
  }
}

export class Unauthorized extends CustomAPIError {
  constructor(public message: string, public code: number) {
    super(message);
    this.code = 403;
  }
}

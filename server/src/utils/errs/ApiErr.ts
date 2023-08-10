export enum ErrCodes {
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,
  InternalServer = 500,
}

export default class ApiErr extends Error {
  protected constructor(message: string, public readonly code: ErrCodes) {
    super(message);
    this.name = "ApiErr";
  }
}

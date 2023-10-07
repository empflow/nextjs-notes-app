import { TErrCode } from "@/shared/types";

export enum HttpCode {
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,
  InternalServer = 500,
}

export default class ApiErr extends Error {
  protected constructor(
    message: string,
    public readonly httpCode: HttpCode,
    public errCode?: TErrCode
  ) {
    super(message);
  }
}

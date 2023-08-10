import ErrCode from "../errCodes";
import ApiErr, { HttpCode } from "./ApiErr";

export default class BadRequestErr extends ApiErr {
  constructor(message: string, errCode?: ErrCode) {
    super(message, HttpCode.BadRequest, errCode);
  }
}

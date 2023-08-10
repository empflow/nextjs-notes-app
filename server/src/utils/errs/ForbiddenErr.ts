import ErrCode from "../errCodes";
import ApiErr, { HttpCode } from "./ApiErr";

export default class ForbiddenErr extends ApiErr {
  constructor(message: string, errCode?: ErrCode) {
    super(message, HttpCode.Forbidden, errCode);
  }
}

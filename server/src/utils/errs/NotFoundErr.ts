import ErrCode from "../errCodes";
import ApiErr, { HttpCode } from "./ApiErr";

export default class NotFoundErr extends ApiErr {
  constructor(message: string, errCode?: ErrCode) {
    super(message, HttpCode.NotFound, errCode);
  }
}

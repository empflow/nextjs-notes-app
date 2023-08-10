import ErrCode from "../errCodes";
import ApiErr from "./ApiErr";
import { HttpCode } from "./ApiErr";

export default class InternalServerErr extends ApiErr {
  constructor(message: string, errCode?: ErrCode) {
    super(message, HttpCode.InternalServer, errCode);
  }
}

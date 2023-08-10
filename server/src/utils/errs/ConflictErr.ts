import ErrCode from "../errCodes";
import ApiErr, { HttpCode } from "./ApiErr";

export default class ConflictErr extends ApiErr {
  constructor(message: string, errCode?: ErrCode) {
    super(message, HttpCode.Conflict, errCode);
  }
}

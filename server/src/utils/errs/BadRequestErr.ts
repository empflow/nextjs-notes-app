import { TErrCode } from "@shared/types";
import ApiErr, { HttpCode } from "./ApiErr";

export default class BadRequestErr extends ApiErr {
  constructor(message: string, errCode?: TErrCode) {
    super(message, HttpCode.BadRequest, errCode);
  }
}

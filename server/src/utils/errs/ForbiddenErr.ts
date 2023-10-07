import { TErrCode } from "@/shared/types";
import ApiErr, { HttpCode } from "./ApiErr";

export default class ForbiddenErr extends ApiErr {
  constructor(message: string, errCode?: TErrCode) {
    super(message, HttpCode.Forbidden, errCode);
  }
}

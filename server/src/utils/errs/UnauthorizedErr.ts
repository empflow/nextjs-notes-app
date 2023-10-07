import { TErrCode } from "@/shared/types";
import ApiErr from "./ApiErr";
import { HttpCode } from "./ApiErr";

export default class UnauthorizedErr extends ApiErr {
  constructor(message: string, errCode?: TErrCode) {
    super(message, HttpCode.Unauthorized, errCode);
  }
}

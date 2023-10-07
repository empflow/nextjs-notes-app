import { TErrCode } from "@/shared/types";
import ApiErr from "./ApiErr";
import { HttpCode } from "./ApiErr";

export default class InternalServerErr extends ApiErr {
  constructor(message: string, errCode?: TErrCode) {
    super(message, HttpCode.InternalServer, errCode);
  }
}

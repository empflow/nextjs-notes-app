import ApiErr from "./ApiErr";
import { HttpCodes } from "./ApiErr";

export default class UnauthorizedErr extends ApiErr {
  constructor(message: string) {
    super(message, HttpCodes.Unauthorized);
  }
}

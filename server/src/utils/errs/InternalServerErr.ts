import ApiErr from "./ApiErr";
import { HttpCodes } from "./ApiErr";

export default class InternalServerErr extends ApiErr {
  constructor(message: string) {
    super(message, HttpCodes.InternalServer);
  }
}

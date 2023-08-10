import ApiErr, { HttpCodes } from "./ApiErr";

export default class ForbiddenErr extends ApiErr {
  constructor(message: string) {
    super(message, HttpCodes.Forbidden);
  }
}

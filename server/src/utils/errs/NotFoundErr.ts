import ApiErr, { HttpCodes } from "./ApiErr";

export default class NotFoundErr extends ApiErr {
  constructor(message: string) {
    super(message, HttpCodes.NotFound);
  }
}

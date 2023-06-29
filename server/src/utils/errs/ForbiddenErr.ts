import ApiErr, { ErrCodes } from "./ApiErr";


export default class ForbiddenErr extends ApiErr {
  constructor (
    message: string,
  ) {
    super(message, ErrCodes.Forbidden);
  }
}

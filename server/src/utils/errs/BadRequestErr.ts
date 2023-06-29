import ApiErr, { ErrCodes } from "./ApiErr";


export default class BadRequestErr extends ApiErr {
  constructor (
    message: string,
  ) {
    super(message, ErrCodes.BadRequest);
  }
}

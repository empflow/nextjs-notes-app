import ApiErr, { ErrCodes } from "./ApiErr";


export default class NotFoundErr extends ApiErr {
  constructor (
    message: string,
  ) {
    super(message, ErrCodes.NotFound);
  }
}

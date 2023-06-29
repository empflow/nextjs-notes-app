import ApiErr, { ErrCodes } from "./ApiErr";


export default class ConflictErr extends ApiErr {
  constructor (
    message: string,
  ) {
    super(message, ErrCodes.Conflict);
  }
}

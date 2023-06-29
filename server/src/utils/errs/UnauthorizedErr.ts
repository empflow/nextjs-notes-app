import ApiErr from "./ApiErr";
import { ErrCodes } from "./ApiErr";


export default class UnauthorizedErr extends ApiErr {
  constructor (
    message: string,
  ) {
    super(message, ErrCodes.Unauthorized);
  }
}

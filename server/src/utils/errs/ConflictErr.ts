import ApiErr, { HttpCodes } from "./ApiErr";

export default class ConflictErr extends ApiErr {
  constructor(message: string) {
    super(message, HttpCodes.Conflict);
  }
}

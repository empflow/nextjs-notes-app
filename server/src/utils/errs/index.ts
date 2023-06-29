import BadRequestErr from "./BadRequestErr";
import ForbiddenErr from "./ForbiddenErr";
import NotFoundErr from "./NotFoundErr";
import UnauthorizedErr from "./UnauthorizedErr";
import ConflictErr from "./ConflictErr";


export type TApiErrs = BadRequestErr | UnauthorizedErr | NotFoundErr | ForbiddenErr | ConflictErr;

export {
  BadRequestErr,
  NotFoundErr,
  UnauthorizedErr,
  ForbiddenErr,
  ConflictErr
}

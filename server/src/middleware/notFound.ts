import { NotFoundErr } from "../utils/errs";

export default function notFound() {
  throw new NotFoundErr("Route does not exist");
}

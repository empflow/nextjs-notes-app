import Cookies from "js-cookie";
import isSsr from "../isSsr";
import getAuthDataGetReturnVal, {
  TGetAuthDataReturnT,
} from "./getAuthDataGetReturnVal";

/**
 * THIS MUST NOT BE CALLED LIKE THIS:
 * ```
 *  export default function Component() {
 *    const authData = clientGetAuthData()
 * }
 * ```
 * DON'T DO WHAT YOU SEE ABOVE!
 *
 * since nextjs runs the code from the client components on the server
 * to generate uninteractable html to improve time to first
 * contentful paint, this will result in the return value
 * of this function being different when run on the client and the server.
 * And if you base some conditional UI logic on the return value of this
 * function, you (probably) inevitably will get a hydration mismatch error
 * because, for example, you get a null value returned on the server
 * and decide to render a `sign in` message, but when this code
 * is run on the client, you get an actual value instead of null
 * and, according to your UI logic, you might render a profile
 * picture. This will cause an hydration mismatch error
 * and probably a nasty flicker when the `sign in` message turns
 * into a profile picture
 *
 * When can you use this then?
 * You can safely call this function from event handlers like onClick,
 * since they can only run on the client
 */
export default function clientGetAuthData(): TGetAuthDataReturnT {
  let username: string | null;
  let refreshToken: string | null;

  username = Cookies.get("username") ?? null;
  refreshToken = Cookies.get("refreshToken") ?? null;

  return getAuthDataGetReturnVal(username, refreshToken);
}

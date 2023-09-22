import serverGetAuthData from "./getAuthData/serverGetAuthData";

export default function isSignedIn() {
  return !!serverGetAuthData();
}

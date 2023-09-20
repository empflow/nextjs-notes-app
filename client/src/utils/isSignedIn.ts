import serverGetAuthData from "./getAuthData/serverGetAuthData";

export default async function isSignedIn() {
  return !!serverGetAuthData();
}

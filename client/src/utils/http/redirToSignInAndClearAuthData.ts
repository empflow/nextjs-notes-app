import clearAuthData from "../clearAuthData";

export default function redirToSignInAndClearAuthData() {
  clearAuthData();
  location.replace("/auth/sign-in");
}

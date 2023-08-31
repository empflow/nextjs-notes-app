import { emailRegex } from "@shared/regexes";

export default function isEmailValid(email: string) {
  return emailRegex.test(email);
}

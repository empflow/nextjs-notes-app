import { hexColorRegex } from "../../../shared/regexes";

export default function isValidHexColor(color: string) {
  return hexColorRegex.test(color);
}

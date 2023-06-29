const specialChars = [
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "-",
  "_",
  "+",
  "=",
  ":",
  ";",
  ",",
  ".",
  "?",
];

export default function doesStrIncludeSpecialChars(str: string) {
  for (const char of str) {
    if (specialChars.includes(char)) return true;
  }
  return false;
}

export default function doesStrIncludeNumbers(str: string) {
  for (const char of str) {
    if (!isNaN(Number(char))) return true;
  }
  return false;
}

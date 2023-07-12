export default function isRefreshTokenObjectStrctureValid(val: any) {
  if (
    !val ||
    Array.isArray(val) ||
    typeof val !== "object" ||
    typeof val.token !== "string" ||
    typeof val.id !== "string"
  ) {
    return false;
  }
  return true;
}

export default function isRefreshTokenValid(val: any) {
  if (
    Array.isArray(val)
    || typeof val !== "object"
    || typeof val.token !== "string"
    || typeof val.id !== "string"
  ) {
    return false;
  }
  return true;
}

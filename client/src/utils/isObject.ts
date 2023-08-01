export default function isObject(val: any) {
  if (val !== null && typeof val === "object" && !Array.isArray(val)) {
    return true;
  }
  return false;
}

export default function isObject(val: any): val is Record<string, unknown> {
  if (val !== null && typeof val === "object" && !Array.isArray(val)) {
    return true;
  }
  return false;
}

export default function isString(payload: unknown): payload is string {
  return typeof payload === "string";
}

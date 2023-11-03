export default function isNullish(val: unknown): val is null | undefined {
  if (val === undefined || val === null) return true;
  return false;
}

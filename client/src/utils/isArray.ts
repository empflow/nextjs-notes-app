export default function isArray(payload: unknown): payload is unknown[] {
  return Array.isArray(payload);
}

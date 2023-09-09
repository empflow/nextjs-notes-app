export default function cloneVal<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

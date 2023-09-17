export default function copyVal<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

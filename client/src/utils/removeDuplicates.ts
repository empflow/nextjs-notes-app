export default function removeDuplicates<T>(arr: T[]) {
  return [...new Set(arr)];
}

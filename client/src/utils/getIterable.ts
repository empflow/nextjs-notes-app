export default function getIterable(length: number) {
  const result = [];
  for (let i = 0; i < length; i++) {
    result.push(i);
  }
  return result;
}

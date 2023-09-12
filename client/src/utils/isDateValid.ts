export default function isValidDate(date: unknown) {
  return date instanceof Date && !isNaN(date as any);
}

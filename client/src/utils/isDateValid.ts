export default function isValidDate(date: Date | string) {
  if (typeof date === "string") date = new Date(date);
  return !isNaN(date.getTime());
}

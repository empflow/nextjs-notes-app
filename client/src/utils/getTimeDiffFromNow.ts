import isValidDate from "./isDateValid";

export default function getTimeDiffFromNow(date: string | Date) {
  if (!isValidDate(date)) return null;
  date = new Date(date);

  return Date.now() - date.getTime();
}

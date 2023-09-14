import isDateValid from "./isDateValid";

type TTimeDivisions = { amount: number; name: Intl.RelativeTimeFormatUnit }[];
const DIVISIONS: TTimeDivisions = [
  { amount: 60, name: "seconds" },
  { amount: 60, name: "minutes" },
  { amount: 24, name: "hours" },
  { amount: 7, name: "days" },
  { amount: 4.34524, name: "weeks" },
  { amount: 12, name: "months" },
  { amount: Number.POSITIVE_INFINITY, name: "years" },
];

type GetFormattedDatesReturnT = string | null;
export default function getTimeAgoFormatted(
  date: string | Date,
  locale?: string,
): GetFormattedDatesReturnT {
  const f = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  if (!isDateValid(date)) return null;
  date = new Date(date);
  let durationSecs = (Date.now() - date.getTime()) / 1000;

  for (const division of DIVISIONS) {
    if (Math.abs(durationSecs) < division.amount) {
      return f.format(Math.round(-durationSecs), division.name);
    }
    durationSecs /= division.amount;
  }

  return null;
}

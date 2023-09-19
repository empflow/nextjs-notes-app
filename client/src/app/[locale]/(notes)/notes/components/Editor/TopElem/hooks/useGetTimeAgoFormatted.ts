import useRerender from "@/app/hooks/useRerender";
import getTimeAgoFormatted from "@/utils/getTimeAgoFormatted";
import { useEffect } from "react";

export default function useGetTimeAgoFormatted(
  date?: string | Date,
  locale?: string,
) {
  const rerender = useRerender();
  useEffect(() => {
    const interval = setInterval(rerender, 1000);
    return () => clearInterval(interval);
  });

  if (!date) return null;
  const timeAgoFormatted = getTimeAgoFormatted(date, locale);

  return timeAgoFormatted;
}

import { useLocale, useTranslations } from "next-intl";
import { ReactNode, useState } from "react";
import useGetTimeAgoFormatted from "./hooks/useGetTimeAgoFormatted";

export type TTopElemState = "createdAt" | "modifiedAt";

interface TProps {
  createdAt: string;
  updatedAt: string;
}

type TState = "createdAt" | "updatedAt";

export default function TopElem({ createdAt, updatedAt }: TProps) {
  const [state, setState] = useState<TState>("createdAt");
  const locale = useLocale();
  const t = useTranslations("Notes");
  const createdAtFormatted = useGetTimeAgoFormatted(createdAt, locale);
  const updatedAtFormatted = useGetTimeAgoFormatted(updatedAt, locale);
  let content: ReactNode;

  if (state === "createdAt") content = `${t("created")} ${createdAtFormatted}`;
  else content = `${t("updated")} ${updatedAtFormatted}`;

  function handleClick() {
    setState((prev) => (prev === "createdAt" ? "updatedAt" : "createdAt"));
  }

  return (
    <div
      className="flex cursor-pointer justify-center text-dark-gray dark:text-gray"
      onClick={handleClick}
    >
      <>{content}</>
    </div>
  );
}

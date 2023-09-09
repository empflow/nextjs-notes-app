import { useTranslations } from "next-intl";
import RetryBtn from "./RetryBtn";

interface TProps {
  retryFn?: () => unknown;
}

export default function Err({ retryFn }: TProps) {
  const errsT = useTranslations("Errors");

  return (
    <div className="flex flex-col gap-2">
      <p>{errsT("errHasOccurred")}</p>
      {retryFn && <RetryBtn {...{ retryFn }} />}
    </div>
  );
}

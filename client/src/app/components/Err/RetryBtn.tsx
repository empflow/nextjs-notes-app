import { useTranslations } from "next-intl";
import { ReactNode, useState } from "react";
import Loading from "../Loading";

interface TProps {
  retryFn: () => unknown;
}

export default function RetryBtn({ retryFn }: TProps) {
  const [isRetrying, setIsRetrying] = useState(false);
  const errsT = useTranslations("Errors");

  async function handleClick() {
    setIsRetrying(true);
    await retryFn();
    setIsRetrying(false);
  }

  let btnInnerElem: string | ReactNode;
  if (isRetrying) btnInnerElem = <Loading />;
  else btnInnerElem = errsT("tryAgain");

  return (
    <div>
      <button
        className="rounded border-2 border-l-accent px-2 py-1 text-l-accent active:bg-l-accent active:text-black dark:border-d-accent dark:text-d-accent active:dark:bg-d-accent active:dark:text-white"
        onClick={handleClick}
      >
        {btnInnerElem}
      </button>
    </div>
  );
}

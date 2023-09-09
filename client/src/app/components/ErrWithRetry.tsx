import { useTranslations } from "next-intl";

interface TProps {
  retryFn: () => unknown;
}

export default function ErrWithRetry({ retryFn }: TProps) {
  const errsT = useTranslations("Errors");

  return (
    <div className="flex flex-col gap-2">
      <p>{errsT("errHasOccurred")}</p>
      <div>
        <button
          className="rounded border-2 border-l-accent px-2 py-1 text-l-accent active:bg-l-accent active:text-black dark:border-d-accent dark:text-d-accent active:dark:bg-d-accent active:dark:text-white"
          onClick={retryFn}
        >
          {errsT("tryAgain")}
        </button>
      </div>
    </div>
  );
}

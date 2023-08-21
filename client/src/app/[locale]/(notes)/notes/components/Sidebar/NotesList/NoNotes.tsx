import { useTranslations } from "next-intl";

export default function NoNotes() {
  const t = useTranslations("Notes");

  return (
    <div className="flex-grow">
      <div className="flex h-full items-center justify-center text-center text-xl text-light-gray">
        {t("noNotes")}
      </div>
    </div>
  );
}

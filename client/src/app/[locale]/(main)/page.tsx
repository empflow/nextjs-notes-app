import { useTranslations } from "next-intl";
import NotesLink from "./components/NotesLink";

export default function Home() {
  const t = useTranslations("Index");
  return (
    <>
      <h1 className="text-3xl font-semibold">{t("title")}</h1>
      <h2 className="text-xl font-medium">{t("subTitle")}</h2>
      <p>{t("description")}</p>
      {/* @ts-expect-error server component */}
      <NotesLink />
    </>
  );
}

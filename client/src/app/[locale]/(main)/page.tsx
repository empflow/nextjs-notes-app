import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import NotesLink from "./components/NotesLink";

interface TProps {
  params: {
    locale: string;
  };
}

export const dynamic = "force-dynamic";

export default function Home({ params: { locale } }: TProps) {
  // `unstable_setRequestLocale` needs to be called on every page (not component)
  // and in the root layout. It's a temporary solution to enable static rendering
  // with next-intl (the internationalization library I'm using)
  unstable_setRequestLocale(locale);
  const t = useTranslations("Index");
  return (
    <>
      <h1 className="text-3xl font-semibold">{t("title")}</h1>
      <h2 className="text-xl font-medium">{t("subTitle")}</h2>
      <p>{t("description")}</p>
      <NotesLink />
    </>
  );
}

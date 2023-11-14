import SignInForm from "./components/SignInForm";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

interface TProps {
  params: {
    locale: string;
  };
}

export default function SignIn({ params: { locale } }: TProps) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("SignIn");

  return (
    <>
      <h1 className="mb-8 text-3xl font-semibold">{t("title")}</h1>
      <div>
        <SignInForm />
      </div>
    </>
  );
}

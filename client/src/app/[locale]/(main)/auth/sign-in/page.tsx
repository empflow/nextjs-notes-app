import SignInForm from "./components/SignInForm";
import { useTranslations } from "next-intl";

export default function SignIn() {
  const t = useTranslations("SignIn");

  return (
    <>
      <h1 className="font-semibold text-3xl mb-8">{t("title")}</h1>
      <div>
        <SignInForm />
      </div>
    </>
  );
}

import SignUpForm from "./components/SignUpForm";
import { useTranslations } from "next-intl";

export default function SignUp() {
  const t = useTranslations("SignUp");

  return (
    <>
      <h1 className="font-semibold text-3xl mb-8">{t("title")}</h1>
      <div>
        <SignUpForm />
      </div>
    </>
  );
}

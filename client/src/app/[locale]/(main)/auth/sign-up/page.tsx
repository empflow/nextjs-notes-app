import SignUpForm from "./components/SignUpForm";
import { useTranslations } from "next-intl";

export default function SignUp() {
  const t = useTranslations("SignUp");

  return (
    <>
      <h1 className="mb-8 text-3xl font-semibold">{t("title")}</h1>
      <div>
        <SignUpForm />
      </div>
    </>
  );
}

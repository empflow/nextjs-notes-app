import { useTranslations } from "next-intl";

export default function useSignUpFormTranslations() {
  const t = useTranslations("SignUp");
  const errsT = useTranslations("Errors");
  const formT = useTranslations("Form");

  return { t, errsT, formT };
}

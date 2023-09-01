import { useTranslations } from "next-intl";

export default function useSignInTranslations() {
  const t = useTranslations("SignIn");
  const errsT = useTranslations("Errors");
  const formT = useTranslations("Form");

  return { t, errsT, formT };
}

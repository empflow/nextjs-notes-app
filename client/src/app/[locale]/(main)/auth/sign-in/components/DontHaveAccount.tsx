import { useTranslations } from "next-intl";
import Link from "next/link";

export default function SignInDontHaveAccount() {
  const t = useTranslations("SignIn");

  return (
    <p>
      {t("dontHaveAccount")}{" "}
      <Link className="text-l-accent dark:text-d-accent" href="/auth/sign-up">
        {t("dontHaveAccountSignUpLink")}
      </Link>
    </p>
  );
}

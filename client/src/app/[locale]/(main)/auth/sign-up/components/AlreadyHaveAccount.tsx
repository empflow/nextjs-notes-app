import { useTranslations } from "next-intl";
import Link from "next/link";

export default function DontHaveAccount() {
  const t = useTranslations("SignUp");

  return (
    <p>
      {t("alreadyHaveAccount")}{" "}
      <Link className="text-l-accent dark:text-d-accent" href="/auth/sign-in">
        {t("alreadyHaveAccountSignInLink")}
      </Link>
    </p>
  );
}

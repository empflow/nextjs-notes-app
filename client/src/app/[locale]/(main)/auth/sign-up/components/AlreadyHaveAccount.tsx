import { Link } from "@/i18nUtils";
import useSignUpFormTranslations from "../hooks/useSignUpFormTranslations";

export default function SignUpAlreadyHaveAccount() {
  const { t } = useSignUpFormTranslations();

  return (
    <p>
      {t("alreadyHaveAccount")}{" "}
      <Link className="text-l-accent dark:text-d-accent" href="/auth/sign-in">
        {t("alreadyHaveAccountSignInLink")}
      </Link>
    </p>
  );
}

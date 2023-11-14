import FormBtn from "@/app/components/form/FormBtn";
import FormErr from "@/app/components/form/FormErr";
import useGetContext from "@/app/hooks/useGetContext";
import SignInFormContext from "@/app/[locale]/(main)/auth/sign-in/components/SignInFormContext";
import SignInDontHaveAccount from "./DontHaveAccount";
import useSignInTranslations from "./hooks/useFormTranslations";

export default function SignInSectionBelowInputs() {
  const { formErrs, isSubmitting } = useGetContext(SignInFormContext);
  const { t } = useSignInTranslations();

  return (
    <div className="flex flex-col gap-3">
      <SignInDontHaveAccount />
      <FormBtn isLoading={isSubmitting} text={t("signInBtn")} />
      <FormErr content={formErrs.root?.server.message} />
    </div>
  );
}

import FormBtn from "@/app/components/form/FormBtn";
import FormErr from "@/app/components/form/FormErr";
import useGetContext from "@/app/hooks/useGetContext";
import SignUpFormContext from "@/app/[locale]/(main)/auth/sign-up/components/SignUpFormContext";
import useSignUpFormTranslations from "../hooks/useSignUpFormTranslations";
import SignUpAlreadyHaveAccount from "./AlreadyHaveAccount";

export default function SignUpSectionBelowInputs() {
  const { formErrs, isSubmitting } = useGetContext(SignUpFormContext);
  const { t } = useSignUpFormTranslations();

  return (
    <div className="flex flex-col gap-3">
      <SignUpAlreadyHaveAccount />
      <FormBtn isLoading={isSubmitting} text={t("signUpBtn")} />
      <FormErr content={formErrs.root?.server.message} />
    </div>
  );
}

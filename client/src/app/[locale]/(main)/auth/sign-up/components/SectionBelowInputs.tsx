import FormBtn from "@/app/components/form/FormBtn";
import FormErr from "@/app/components/form/FormErr";
import useGetContext from "@/app/hooks/useGetContext";
import SignUpFormContext from "@/contexts/SignUpFormContext";
import useSignUpFormTranslations from "../hooks/useSignUpFormTranslations";
import AlreadyHaveAccount from "./AlreadyHaveAccount";

export default function SectionBelowInputs() {
  const { formErrs, isSubmitting } = useGetContext(SignUpFormContext);
  const { t } = useSignUpFormTranslations();

  return (
    <div className="flex flex-col gap-3">
      <AlreadyHaveAccount />
      <FormBtn isLoading={isSubmitting} text={t("signUpBtn")} />
      <FormErr content={formErrs.root?.server.message} />
    </div>
  );
}

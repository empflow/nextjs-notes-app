import InputWithLabel from "@/app/components/form/InputWithLabel";
import useGetContext from "@/app/hooks/useGetContext";
import SignInFormContext from "@/app/[locale]/(main)/auth/sign-in/components/SignInFormContext";
import { emailRegex } from "@shared/regexes";
import useSignInTranslations from "./hooks/useFormTranslations";

export default function SignInEmailInput() {
  const { formT } = useSignInTranslations();
  const { register, formErrs } = useGetContext(SignInFormContext);

  return (
    <InputWithLabel
      label={formT("email")}
      register={register("email", {
        required: formT("noEmail"),
        pattern: {
          value: emailRegex,
          message: formT("invalidEmail"),
        },
      })}
      className="blue-outline"
      type="email"
      errMsg={formErrs.email?.message}
    />
  );
}

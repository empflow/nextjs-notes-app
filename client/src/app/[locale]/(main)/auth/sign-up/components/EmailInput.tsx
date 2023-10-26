import InputWithLabel from "@/app/components/form/InputWithLabel";
import useGetContext from "@/app/hooks/useGetContext";
import SignUpFormContext from "@/contexts/SignUpFormContext";
import { emailRegex } from "@shared/regexes";
import useSignUpFormTranslations from "../hooks/useSignUpFormTranslations";

export default function SignUpEmailInput() {
  const { formT } = useSignUpFormTranslations();
  const { register, formErrs } = useGetContext(SignUpFormContext);

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

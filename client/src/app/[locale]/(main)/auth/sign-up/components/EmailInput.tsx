import Input from "@/app/components/form/Input";
import useGetContext from "@/app/hooks/useGetContext";
import SignUpFormContext from "@/contexts/SignUpFormContext";
import { emailRegex } from "@shared/regexes";
import useSignUpFormTranslations from "../hooks/useSignUpFormTranslations";

export default function EmailInput() {
  const { formErrs, register } = useGetContext(SignUpFormContext);
  const { formT } = useSignUpFormTranslations();

  return (
    <Input
      label={formT("email")}
      register={register("email", {
        required: formT("noEmail"),
        pattern: {
          value: emailRegex,
          message: formT("invalidEmail"),
        },
      })}
      type="email"
      errMsg={formErrs.email?.message}
    />
  );
}

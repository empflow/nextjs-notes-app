import InputWithLabel from "@/app/components/form/InputWithLabel";
import useGetContext from "@/app/hooks/useGetContext";
import SignUpFormContext from "@/contexts/SignUpFormContext";
import { minPasswordLength, maxPasswordLength } from "@shared/values";
import useSignUpFormTranslations from "../hooks/useSignUpFormTranslations";

export default function SignUpPasswordInput() {
  const { formT } = useSignUpFormTranslations();
  const { register, formErrs } = useGetContext(SignUpFormContext);

  return (
    <InputWithLabel
      label={formT("password")}
      register={register("password", {
        required: formT("noPassword"),
        minLength: {
          value: minPasswordLength,
          message: formT("passwordTooShort", { pwdLength: minPasswordLength }),
        },
        maxLength: {
          value: maxPasswordLength,
          message: formT("passwordTooLong", { pwdLength: maxPasswordLength }),
        },
      })}
      className="blue-outline"
      type="password"
      errMsg={formErrs.password?.message}
    />
  );
}

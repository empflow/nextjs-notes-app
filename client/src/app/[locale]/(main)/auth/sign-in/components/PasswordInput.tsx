import InputWithLabel from "@/app/components/form/InputWithLabel";
import useGetContext from "@/app/hooks/useGetContext";
import SignInFormContext from "@/contexts/SignInFormContext";
import { minPasswordLength, maxPasswordLength } from "@shared/values";
import useSignInTranslations from "./hooks/useFormTranslations";

export default function SignInPasswordInput() {
  const { formT } = useSignInTranslations();
  const { register, formErrs } = useGetContext(SignInFormContext);

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

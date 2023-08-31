import { TSignUpFormInputValues } from "@/app/[locale]/(main)/auth/sign-up/components/SignUpForm";
import { TContext } from "@/utils/types";
import { createContext } from "react";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";

interface TSignUpFormContextValue {
  formErrs: FieldErrors<TSignUpFormInputValues>;
  register: UseFormRegister<TSignUpFormInputValues>;
  email: string;
  isSubmitting: boolean;
  formWatch: UseFormWatch<TSignUpFormInputValues>;
}

type TSignUpFormContext = TContext<TSignUpFormContextValue>;
const SignUpFormContext = createContext<TSignUpFormContext>(null);

export default SignUpFormContext;

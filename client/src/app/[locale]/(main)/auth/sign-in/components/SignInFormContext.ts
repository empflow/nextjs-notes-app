import { TSignInFormInputValues } from "@/app/[locale]/(main)/auth/sign-in/components/SignInForm";
import { TContext } from "@/utils/types";
import { createContext } from "react";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";

interface TSignInFormContextValue {
  formErrs: FieldErrors<TSignInFormInputValues>;
  register: UseFormRegister<TSignInFormInputValues>;
  email: string;
  isSubmitting: boolean;
  formWatch: UseFormWatch<TSignInFormInputValues>;
}

type TSignInFormContext = TContext<TSignInFormContextValue>;
const SignInFormContext = createContext<TSignInFormContext>(null);

export default SignInFormContext;

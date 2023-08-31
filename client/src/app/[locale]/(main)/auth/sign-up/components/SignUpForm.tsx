"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Captcha from "@/app/components/Captcha";
import Input from "@/app/components/form/Input";
import FormBtn from "@/app/components/form/FormBtn";
import AlreadyHaveAccount from "./AlreadyHaveAccount";
import FormErr from "@/app/components/form/FormErr";
import storeAuthRespData from "@/utils/storeAuthRespData";
import useIsUsernameAvailableQuery from "@/app/hooks/queries/useIsUsernameAvailableQuery";
import IsUsernameAvailable from "./IsUsernameAvailable";
import useSignUpQuery from "@/app/hooks/queries/useSignUpQuery";
import useHandleErrs from "../hooks/useHandleErrs";
import useSignUpFormTranslations from "../hooks/useSignUpFormTranslations";
import useCaptcha from "@/app/hooks/useCaptcha";
import { emailRegex } from "@shared/regexes";
import EmailInput from "./EmailInput";
import SignUpFormContext from "@/contexts/SignUpFormContext";
import PasswordInput from "./PasswordInput";
import Inputs from "./Inputs";
import SectionBelowInputs from "./SectionBelowInputs";

export interface TSignUpFormInputValues {
  email: string;
  password: string;
}

export default function SignInForm() {
  const { errsT, t } = useSignUpFormTranslations();
  const { captchaRef, captchaTheme } = useCaptcha();
  const router = useRouter();

  const {
    register,
    formState: { errors: formErrs, isSubmitting },
    handleSubmit,
    setError: setFormErr,
    clearErrors: clearFormErrs,
    watch: formWatch,
  } = useForm<TSignUpFormInputValues>();
  const formData = formWatch();
  const email = formWatch("email", "");

  const { refetch: signUpFetch } = useSignUpQuery({ formData, captchaRef });
  useIsUsernameAvailableQuery({
    clearFormErrs,
    username: email,
    setUnknownErr,
  });
  useHandleErrs({ setUnknownErr, email, setFormErr });

  async function onSubmit() {
    const { isError, data } = await signUpFetch();
    if (isError || !data) return setUnknownErr();
    storeAuthRespData(data);
    router.push("/notes");
  }

  function setUnknownErr() {
    setFormErr("root.server", {
      type: "unknown",
      message: errsT("generic"),
    });
  }

  return (
    <SignUpFormContext.Provider
      value={{ formErrs, register, email, isSubmitting, formWatch }}
    >
      <Captcha theme={captchaTheme} ref={captchaRef} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex max-w-md flex-col gap-5"
      >
        <Inputs />
        <SectionBelowInputs />
      </form>
    </SignUpFormContext.Provider>
  );
}

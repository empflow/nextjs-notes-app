"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Captcha from "@/app/components/Captcha";
import storeAuthRespData from "@/utils/storeAuthRespData";
import useIsUsernameAvailableQuery from "@/app/hooks/reactQuery/useIsUsernameAvailableQuery";
import useSignUpQuery from "@/app/hooks/reactQuery/useSignUpQuery";
import useHandleErrs from "../hooks/useHandleErrs";
import useSignUpFormTranslations from "../hooks/useSignUpFormTranslations";
import useCaptcha from "@/app/hooks/useCaptcha";
import SignUpFormContext from "@/contexts/SignUpFormContext";
import SignUpInputs from "./Inputs";
import SignUpSectionBelowInputs from "./SectionBelowInputs";

export interface TSignUpFormInputValues {
  email: string;
  password: string;
}

export default function SignInForm() {
  const { errsT } = useSignUpFormTranslations();
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
        <SignUpInputs />
        <SignUpSectionBelowInputs />
      </form>
    </SignUpFormContext.Provider>
  );
}

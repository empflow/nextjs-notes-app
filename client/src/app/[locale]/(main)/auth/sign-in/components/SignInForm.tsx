"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Captcha from "@/app/components/Captcha";
import useSignInQuery from "@/app/hooks/reactQuery/useSignInQuery";
import storeAuthRespData from "@/utils/storeAuthRespData";
import useSignInTranslations from "./hooks/useFormTranslations";
import SignInInputs from "./Inputs";
import SignInSectionBelowInputs from "./SectionBelowInputs";
import SignInFormContext from "@/contexts/SignInFormContext";
import useHandleSignInErrs from "./hooks/useHandleErrs";
import useCaptcha from "@/app/hooks/useCaptcha";

export interface TSignInFormInputValues {
  email: string;
  password: string;
}

export default function SignInForm() {
  const { errsT } = useSignInTranslations();
  const router = useRouter();
  const { captchaRef, captchaTheme } = useCaptcha();

  const {
    register,
    formState: { errors: formErrs, isSubmitting },
    handleSubmit,
    getValues: getFormValues,
    setError: setFormErr,
    watch: formWatch,
  } = useForm<TSignInFormInputValues>();
  const email = formWatch("email", "");
  console.log(email);
  const { refetch: fetchSignIn } = useSignInQuery({
    formData: getFormValues(),
    captchaRef,
  });
  useHandleSignInErrs({ setFormErr, setUnknownErr });

  async function onSubmit() {
    const { isError, data } = await fetchSignIn();
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
    <SignInFormContext.Provider
      value={{ formErrs, register, email, isSubmitting, formWatch }}
    >
      <Captcha theme={captchaTheme} ref={captchaRef} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex max-w-md flex-col gap-5"
      >
        <SignInInputs />
        <SignInSectionBelowInputs />
      </form>
    </SignInFormContext.Provider>
  );
}

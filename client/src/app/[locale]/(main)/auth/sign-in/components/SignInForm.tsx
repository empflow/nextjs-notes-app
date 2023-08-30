"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useTheme } from "next-themes";
import getCaptchaTheme from "@/utils/getCaptchaTheme";
import { useTranslations } from "next-intl";
import { TErrCode } from "@shared/types";
import { useForm } from "react-hook-form";
import Captcha from "@/app/components/Captcha";
import Input from "@/app/components/form/Input";
import useSignInQuery from "@/app/hooks/queries/useSignInQuery";
import FormBtn from "@/app/components/form/FormBtn";
import DontHaveAccount from "./DontHaveAccount";
import isAxiosErrWithResp from "@/utils/isAxiosErrWithResp";
import FormErr from "@/app/components/form/FormErr";
import storeAuthRespData from "@/utils/storeAuthRespData";

export interface TSignInFormInputValues {
  email: string;
  password: string;
}

export default function SignInForm() {
  const t = useTranslations("SignIn");
  const errsT = useTranslations("Errors");
  const formT = useTranslations("Form");

  const { resolvedTheme } = useTheme();
  const captchaTheme = getCaptchaTheme(resolvedTheme);
  const router = useRouter();
  const captchaRef = useRef<ReCAPTCHA>(null);

  const {
    register,
    formState: { errors: formErrs, isSubmitting },
    handleSubmit,
    getValues: getFormValues,
    setError: setFormErr,
  } = useForm<TSignInFormInputValues>();
  const {
    refetch: signIn,
    isError: signInIsErr,
    error: signInFetchErr,
    data: signInData,
  } = useSignInQuery({
    formData: getFormValues(),
    captchaRef,
  });

  async function onSubmit() {
    const { isError } = await signIn();
    if (isError || !signInData) return setUnknownErr();
    storeAuthRespData(signInData);
    router.push("/notes");
  }

  useEffect(() => {
    if (!signInFetchErr) return;
    if (!isAxiosErrWithResp(signInFetchErr)) return setUnknownErr();
    switch (signInFetchErr.response.data.errCode) {
      case TErrCode.INVALID_CREDENTIALS:
        return setFormErr("root.server", {
          type: "invalidCredentials",
          message: t("invalidCredentials"),
        });
      case TErrCode.USER_NOT_FOUND:
        return setFormErr("root.server", {
          type: "userNotFound",
          message: t("userNotFound"),
        });
      default:
        return setUnknownErr();
    }
  }, [signInIsErr]);

  function setUnknownErr() {
    setFormErr("root.server", {
      type: "unknown",
      message: errsT("generic"),
    });
  }

  return (
    <>
      <Captcha theme={captchaTheme} ref={captchaRef} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex max-w-md flex-col gap-5"
      >
        <div className="flex flex-col gap-3">
          <Input
            label="Email"
            register={register("email", { required: formT("noEmail") })}
            type="email"
            errMsg={formErrs.email?.message}
          />
          <Input
            label="Password"
            register={register("password", { required: formT("noPassword") })}
            type="password"
            errMsg={formErrs.password?.message}
          />
        </div>

        <div className="flex flex-col gap-3">
          <DontHaveAccount />
          <FormBtn isLoading={isSubmitting} text={t("signInBtn")} />
          <FormErr content={formErrs.root?.server.message} />
        </div>
      </form>
    </>
  );
}

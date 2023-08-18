"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import BigBtn from "@/app/components/buttons/Big";
import ReCAPTCHA from "react-google-recaptcha";
import { useTheme } from "next-themes";
import getCaptchaTheme from "@/utils/getCaptchaTheme";
import { useTranslations } from "next-intl";
import useFetch from "@/app/hooks/useFetch/useFetch";
import getCaptchaToken from "@/utils/getCaptchaToken";
import Err from "@/app/components/Err";
import isObject from "@/utils/isObject";
import Loading from "@/app/components/Loading";
import storeAuthRespData from "@/utils/storeAuthRespData";
import devMode from "@/utils/devMode";
import isValidAuthResp from "@/utils/isValidAuthResp";
import notify from "@/utils/notify";

export default function SignInForm() {
  const t = useTranslations("SignIn");
  const errsT = useTranslations("Errors");
  const formT = useTranslations("Form");

  const { resolvedTheme } = useTheme();
  const captchaTheme = getCaptchaTheme(resolvedTheme);
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: `Hayley.Schulist@yahoo.com`,
    password: "GffIiAUR_rv7urd0#",
  });
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const captchaRef = useRef<ReCAPTCHA>(null);
  const errsInitState = {
    invalidCredentials: false,
    unknownErr: false,
  };
  const [errs, setErrs] = useState<typeof errsInitState>(errsInitState);
  const {
    data: signInRespData,
    err: signInRespErr,
    fetch: signInFetch,
    loading: signInLoading,
    setLoading: signInSetLoading,
  } = useFetch({
    url: "/auth/sign-in",
    method: "post",
    body: formData,
    opts: { withAuth: false, fetchImmediately: false },
  });

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setHasSubmitted(true);
    signInSetLoading(true);

    if (devMode()) {
      const captchaBypassToken = process.env.NEXT_PUBLIC_CAPTCHA_BYPASS_TOKEN;
      return await signInFetch({ ...formData, captchaBypassToken });
    }

    const captchaToken = await getCaptchaToken(captchaRef);
    signInFetch({ ...formData, captchaToken });
  }

  useEffect(() => {
    if (!hasSubmitted) return;
    if (isValidAuthResp(signInRespData)) {
      storeAuthRespData(signInRespData);
    } else {
      notify(errsT("generic"));
    }
    router.push("/notes");
  }, [signInRespData]);

  useEffect(() => {
    if (!signInRespErr) return;
    switch (signInRespErr.status) {
      case 401:
        setErrs((prev) => ({ ...prev, invalidCredentials: true }));
        break;
      default:
        unknownErr();
    }
  }, [signInRespErr]);

  function onEmailChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({ ...prev, email: e.target.value }));
  }

  function onPasswordChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({ ...prev, password: e.target.value }));
  }

  function unknownErr() {
    setErrs((prev) => ({ ...prev, unknownErr: true }));
  }

  return (
    <>
      <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
        size="invisible"
        ref={captchaRef}
        theme={captchaTheme}
      />

      <form onSubmit={onSubmit} className="flex max-w-md flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="email">{t("emailLabel")}</label>
          <input
            className="blue-outline rounded px-3 py-2"
            value={formData.email}
            onChange={onEmailChange}
            id="email"
            type={"email"}
            placeholder="you@example.com"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">{t("passwordLabel")}</label>
          <input
            value={formData.password}
            onChange={onPasswordChange}
            id="password"
            className="blue-outline rounded px-3 py-2"
            type={"password"}
          />
        </div>

        <div className="flex flex-col gap-3">
          <p>
            {t("dontHaveAccount")}{" "}
            <Link className="text-l-accent dark:text-d-accent" href="/sign-up">
              {t("dontHaveAccountSignUpLink")}
            </Link>
          </p>

          <div>
            <BigBtn className={`w-full ${signInLoading ? "cursor-wait" : ""}`}>
              {signInLoading ? (
                <div className="flex w-full items-center justify-center">
                  <div className="relative h-[1.5rem] w-[1.5rem]">
                    <Loading
                      childStyle={{
                        borderColor: "white",
                        borderTopColor: "transparent",
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div>{t("signInBtn")}</div>
              )}
            </BigBtn>
          </div>

          <div>
            {errs.invalidCredentials && <Err msg={t("invalidCredentials")} />}
            {errs.unknownErr && <Err msg={errsT("generic")} />}
          </div>
        </div>
      </form>
    </>
  );
}

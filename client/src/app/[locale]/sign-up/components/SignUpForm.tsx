"use client";

import BigBtn from "@/app/components/buttons/Big";
import getCaptchaTheme from "@/utils/getCaptchaTheme";
import axios from "@/config/axios";
import Cookies from "js-cookie";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslations } from "next-intl";
import useFetch from "@/app/hooks/useFetch";
import PreviousMap from "postcss/lib/previous-map";
import Err from "@/app/components/Err";
import getCaptchaToken from "@/utils/getCaptchaToken";
import checkEmailValid from "@/utils/checkEmailValid";

export default function SignUpForm() {
  const { resolvedTheme } = useTheme();
  const theme = getCaptchaTheme(resolvedTheme);
  const t = useTranslations("SignUp");
  const errsT = useTranslations("Errors");
  const captchaRef = useRef<ReCAPTCHA>(null);
  const router = useRouter();
  const [isEmailValid, setIsEmailValid] = useState(false);
  const errsInitState = {
    usernameTakenErr: false,
    unknownErr: false,
    clientSide: {
      invalidEmail: false,
    },
  };
  const [errs, setErrs] = useState(errsInitState);
  const [formData, setFormData] = useState({
    email: `johndoe@example.com`,
    password: "sldfjsldfkj435$$",
    captchaToken: "",
  });
  const { data, err, fetch, loading, setLoading } = useFetch("/auth/sign-up", {
    method: "post",
    body: formData,
  });

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  useEffect(() => {
    setIsEmailValid(checkEmailValid(formData.email));
  }, [formData.email]);

  useEffect(() => {
    if (!err) return;
    if (!err?.response) return unknownErr();
    switch (err.response.status) {
      case 409:
        setErrs((prev) => ({ ...prev, usernameTakenErr: true }));
        break;
      default:
        unknownErr();
    }
  }, [data, err]);

  async function submitBtnOnClick() {
    setErrs(errsInitState);
    setLoading(true);
    const captchaToken = await getCaptchaToken(captchaRef);
    await fetch({ ...formData, captchaToken });
  }

  function unknownErr() {
    setErrs((prev) => ({ ...prev, unknownErr: true }));
  }

  function onEmailChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({ ...prev, email: e.target.value }));
  }

  function onPasswordChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({ ...prev, password: e.target.value }));
  }

  return (
    <>
      <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
        size="invisible"
        ref={captchaRef}
        theme={theme}
      />
      <form onSubmit={onSubmit} className="max-w-md flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="email">{t("emailLabel")}</label>
          <input
            className="px-3 py-2 rounded blue-outline"
            value={formData.email}
            onChange={onEmailChange}
            id="email"
            type={"email"}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">{t("passwordLabel")}</label>
          <input
            value={formData.password}
            onChange={onPasswordChange}
            id="password"
            className="px-3 py-2 rounded blue-outline"
            type={"password"}
          />
        </div>

        <div className="flex flex-col gap-3">
          <p>
            {t("alreadyHaveAccount")}{" "}
            <Link className="text-l-accent dark:text-d-accent" href="/sign-in">
              {t("alreadyHaveAccountSignInLink")}
            </Link>
          </p>
          <div>
            <BigBtn className="w-full" onClick={submitBtnOnClick}>
              {loading ? t("loading") : t("signUpBtn")}
            </BigBtn>
          </div>
          <div>
            {errs.usernameTakenErr && (
              <Err msg={errsT("usernameTaken", { username: formData.email })} />
            )}
            {errs.unknownErr && <Err msg={errsT("generic")} />}
          </div>
        </div>
      </form>
    </>
  );
}

function checkResponseData(data: any) {
  if (!data.accessToken || !data.refreshToken || !data.username) {
    throw new Error("something is not present in the response");
  }
}

function storeResponseData(data: any) {
  const daysIn15Mins = 0.010416;
  const ninetyDays = 90;
  const refreshToken = JSON.stringify(data.refreshToken);

  Cookies.set("accessToken", data.accessToken, {
    expires: daysIn15Mins,
  });
  Cookies.set("refreshToken", refreshToken, { expires: ninetyDays });
  localStorage.setItem("username", data.username);
}

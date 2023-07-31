"use client";

import BigBtn from "@/app/components/buttons/Big";
import getCaptchaTheme from "@/utils/getCaptchaTheme";
import Cookies from "js-cookie";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslations } from "next-intl";
import useFetch from "@/app/hooks/useFetch";
import Err from "@/app/components/Err";
import getCaptchaToken from "@/utils/getCaptchaToken";
import checkEmailValid from "@/utils/checkEmailValid";
import Loading from "@/app/components/Loading";
import CheckmarkIcon from "@/icons/Checkmark";

export default function SignUpForm() {
  const { resolvedTheme } = useTheme();
  const theme = getCaptchaTheme(resolvedTheme);
  const t = useTranslations("SignUp");
  const errsT = useTranslations("Errors");
  const captchaRef = useRef<ReCAPTCHA>(null);
  const [formData, setFormData] = useState({
    email: `johndoe@example.com`,
    password: "sldfjsldfkj435$$",
    captchaToken: "",
  });
  const [isEmailValid, setIsEmailValid] = useState(false);
  const checkUsernameAvailTimeoutId = useRef<null | NodeJS.Timeout>(null);
  const errsInitState = {
    usernameTakenErr: false,
    unknownErr: false,
    clientSide: {
      invalidEmail: false,
    },
  };
  const [errs, setErrs] = useState(errsInitState);
  const {
    data: signUpRespData,
    err: signUpRespErr,
    fetch: signUpFetch,
    loading: signUpLoading,
    setLoading: signUpSetLoading,
  } = useFetch("/auth/sign-up", {
    method: "post",
    body: formData,
  });
  const {
    data: isUsernameAvailRespData,
    err: isUsernameAvailErr,
    fetch: isUsernameAvailFetch,
    loading: isUsernameAvailLoading,
  } = useFetch("/auth/check-username-availability", {
    method: "post",
    body: { username: formData.email },
  });

  useEffect(() => {
    if (!isEmailValid) return;
    setErrs((prev) => ({ ...prev, usernameTakenErr: false }));
    if (checkUsernameAvailTimeoutId.current) {
      clearTimeout(checkUsernameAvailTimeoutId.current);
    }
    checkUsernameAvailTimeoutId.current = setTimeout(async () => {
      await isUsernameAvailFetch();
    }, 500);
  }, [formData.email]);

  useEffect(() => {
    if (!signUpRespErr) return;
    if (!signUpRespErr?.response) return unknownErr();
    switch (signUpRespErr.response.status) {
      case 409:
        setErrs((prev) => ({ ...prev, usernameTakenErr: true }));
        break;
      default:
        unknownErr();
    }
  }, [signUpRespData, signUpRespErr]);

  async function submitBtnOnClick() {
    setErrs(errsInitState);
    signUpSetLoading(true);
    const captchaToken = await getCaptchaToken(captchaRef);
    await signUpFetch({ ...formData, captchaToken });
  }

  function unknownErr() {
    setErrs((prev) => ({ ...prev, unknownErr: true }));
  }

  function onEmailChange(e: ChangeEvent<HTMLInputElement>) {
    setIsEmailValid(checkEmailValid(e.target.value));
    setFormData((prev) => ({ ...prev, email: e.target.value }));
  }

  function onPasswordChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({ ...prev, password: e.target.value }));
  }

  let usernameAvailElem = <></>;
  interface UsernameAvailResp {
    ok: boolean;
  }
  if (isUsernameAvailLoading) {
    usernameAvailElem = (
      <div className="flex gap-2">
        <Loading /> {t("checkingUsernameAvailability")}
      </div>
    );
  }
  console.log(isUsernameAvailLoading);
  if (
    typeof isUsernameAvailRespData === "object" &&
    isUsernameAvailRespData !== null &&
    !Array.isArray(isUsernameAvailRespData)
  ) {
    if ((isUsernameAvailRespData as UsernameAvailResp).ok) {
      usernameAvailElem = (
        <div className="flex gap-2">
          <CheckmarkIcon
            className="fill-l-success dark:fill-d-success"
            pxSize={25}
          />
          {t("usernameAvailable")}
        </div>
      );
    }
  }
  return (
    <>
      <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
        size="invisible"
        ref={captchaRef}
        theme={theme}
      />
      <form
        onSubmit={(e) => e.preventDefault()}
        className="max-w-md flex flex-col gap-5"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="email">{t("emailLabel")}</label>
          <input
            className="px-3 py-2 rounded blue-outline"
            value={formData.email}
            onChange={onEmailChange}
            id="email"
            type={"email"}
          />
          <div className="">{usernameAvailElem}</div>
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
              {signUpLoading ? t("loading") : t("signUpBtn")}
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

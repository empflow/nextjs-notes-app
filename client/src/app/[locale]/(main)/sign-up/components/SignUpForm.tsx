"use client";

import BigBtn from "@/app/components/buttons/Big";
import getCaptchaTheme from "@/utils/getCaptchaTheme";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslations } from "next-intl";
import useFetch from "@/app/hooks/useFetch/useFetch";
import Err from "@/app/components/Err";
import getCaptchaToken from "@/utils/getCaptchaToken";
import checkEmailValid from "@/utils/checkEmailValid";
import Loading from "@/app/components/Loading";
import CheckmarkIcon from "@/icons/Checkmark";
import ErrIcon from "@/icons/Err";
import isObject from "@/utils/isObject";
import storeAuthRespData from "@/utils/storeAuthRespData";
import isInDevMode from "@/utils/isInDevMode";

interface UsernameAvailResp {
  ok: boolean;
}

export default function SignUpForm() {
  const { resolvedTheme } = useTheme();
  const theme = getCaptchaTheme(resolvedTheme);
  const t = useTranslations("SignUp");
  const errsT = useTranslations("Errors");
  const formT = useTranslations("Form");
  const captchaRef = useRef<ReCAPTCHA>(null);
  const [formData, setFormData] = useState({
    email: ``,
    password: "sldfjsldfkj435$$",
    captchaToken: "",
  });
  const [hasSubmitted, setHasSubmitted] = useState(false);
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
  } = useFetch({
    url: "/auth/sign-up",
    method: "post",
    body: formData,
    opts: { fetchImmediately: false, withAuth: false },
  });
  const {
    data: isUsernameAvailRespData,
    err: isUsernameAvailErr,
    fetch: isUsernameAvailFetch,
    loading: isUsernameAvailLoading,
  } = useFetch({
    url: "/auth/check-username-availability",
    method: "post",
    body: { username: formData.email },
    opts: { fetchImmediately: false, withAuth: false },
  });

  useEffect(() => {
    const emailExists = !!formData.email.length;
    if (errs.clientSide.invalidEmail || !emailExists) return;

    setErrs((prev) => ({
      ...prev,
      usernameTakenErr: false,
    }));
    if (checkUsernameAvailTimeoutId.current) {
      clearTimeout(checkUsernameAvailTimeoutId.current);
    }
    checkUsernameAvailTimeoutId.current = setTimeout(async () => {
      clearUnknownErr();
      await isUsernameAvailFetch();
    }, 500);
  }, [formData.email]);

  useEffect(() => {
    if (!signUpRespErr) return;
    switch (signUpRespErr.status) {
      case 409:
        setErrs((prev) => ({ ...prev, usernameTakenErr: true }));
        break;
      default:
        unknownErr();
    }
  }, [signUpRespErr]);

  useEffect(() => {
    if (!hasSubmitted) return;
    if (isValidAuthResp(signUpRespData)) {
      storeAuthRespData(signUpRespData);
    } else {
      return unknownErr();
    }

    location.replace("/notes");
  }, [signUpRespData]);

  async function submitBtnOnClick() {
    setHasSubmitted(true);
    if (!formData.email || !formData.password || errs.clientSide.invalidEmail) {
      return;
    }
    if (!formData.email)
      setErrs((prev) => ({
        ...prev,
        clientSide: { ...prev.clientSide, noEmail: true },
      }));
    setErrs(errsInitState);
    signUpSetLoading(true);

    if (isInDevMode()) {
      const captchaBypassToken = process.env.CAPTCHA_BYPASS_TOKEN;
      return await signUpFetch({ ...formData, captchaBypassToken });
    }
    const captchaToken = await getCaptchaToken(captchaRef);
    await signUpFetch({ ...formData, captchaToken });
  }

  function unknownErr() {
    setErrs((prev) => ({ ...prev, unknownErr: true }));
  }
  function clearUnknownErr() {
    setErrs((prev) => ({ ...prev, unknownErr: false }));
  }

  function onEmailChange(e: ChangeEvent<HTMLInputElement>) {
    const { value: email } = e.target;
    setFormData((prev) => ({ ...prev, email: email }));

    setErrs((prev) => ({
      ...prev,
      clientSide: {
        ...prev.clientSide,
        invalidEmail: isEmailInvalid(email),
      },
    }));
  }

  function onPasswordChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({ ...prev, password: e.target.value }));
  }

  function onFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  const usernameAvailElem = useMemo(() => {
    if (isUsernameAvailLoading) {
      return (
        <div className="flex items-center gap-2">
          <Loading />
          {t("checkingUsernameAvailability")}
        </div>
      );
    } else if (isObject(isUsernameAvailRespData)) {
      if (isValidUsernameAvailResp(isUsernameAvailRespData)) {
        return (
          <div className="flex items-center gap-2">
            <CheckmarkIcon
              className="flex-shrink-0 fill-l-success dark:fill-d-success"
              pxSize={24}
            />
            {t("usernameAvailable")}
          </div>
        );
      } else unknownErr();
    } else if (isUsernameAvailErr) {
      if (isUsernameAvailErr.status !== 409) return;
      return (
        <div className="flex items-center gap-2">
          <ErrIcon
            pxSize={24}
            className="flex-shrink-0 fill-l-error dark:fill-d-error"
          />
          {t("usernameTaken", { username: formData.email })}
        </div>
      );
    }
  }, [isUsernameAvailErr, isUsernameAvailLoading, isUsernameAvailRespData]);

  return (
    <>
      <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
        size="invisible"
        ref={captchaRef}
        theme={theme}
      />
      <form onSubmit={onFormSubmit} className="flex max-w-md flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="email">{t("emailLabel")}</label>
          <input
            className="blue-outline rounded px-3 py-2"
            value={formData.email}
            onChange={onEmailChange}
            id="email"
            type={"email"}
            placeholder="you@example.com"
            required
          />
          {!formData.email && hasSubmitted && <Err msg={formT("noEmail")} />}
          {errs.clientSide.invalidEmail && hasSubmitted && (
            <Err msg={formT("invalidEmail")} />
          )}
          <div className="">{usernameAvailElem}</div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">{t("passwordLabel")}</label>
          <input
            value={formData.password}
            onChange={onPasswordChange}
            id="password"
            className="blue-outline rounded px-3 py-2"
            type={"password"}
            required
          />
          {!formData.password && hasSubmitted && (
            <Err msg={formT("noPassword")} />
          )}
        </div>

        <div className="flex flex-col gap-3">
          <p>
            {t("alreadyHaveAccount")}{" "}
            <Link className="text-l-accent dark:text-d-accent" href="/sign-in">
              {t("alreadyHaveAccountSignInLink")}
            </Link>
          </p>
          <div>
            <BigBtn
              className={`w-full ${signUpLoading ? "cursor-wait" : ""}`}
              onClick={submitBtnOnClick}
            >
              {signUpLoading ? (
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
                <div>{t("signUpBtn")}</div>
              )}
            </BigBtn>
          </div>
          <div>
            {errs.usernameTakenErr && (
              <Err msg={t("usernameTaken", { username: formData.email })} />
            )}
            {errs.unknownErr && <Err msg={errsT("generic")} />}
          </div>
        </div>
      </form>
    </>
  );
}

function isEmailInvalid(email: string) {
  if (email.length === 0) return false;
  return !checkEmailValid(email);
}

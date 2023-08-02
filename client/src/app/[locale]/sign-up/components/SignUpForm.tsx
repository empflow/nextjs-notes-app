"use client";

import BigBtn from "@/app/components/buttons/Big";
import getCaptchaTheme from "@/utils/getCaptchaTheme";
import Cookies from "js-cookie";
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
import useFetch from "@/app/hooks/useFetch";
import Err from "@/app/components/Err";
import getCaptchaToken from "@/utils/getCaptchaToken";
import checkEmailValid from "@/utils/checkEmailValid";
import Loading from "@/app/components/Loading";
import CheckmarkIcon from "@/icons/Checkmark";
import ErrIcon from "@/icons/Err";
import isObject from "@/utils/isObject";

interface UsernameAvailResp {
  ok: boolean;
}

export default function SignUpForm() {
  const router = useRouter();
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
    if (!signUpRespErr?.response) return unknownErr();
    switch (signUpRespErr.response.status) {
      case 409:
        setErrs((prev) => ({ ...prev, usernameTakenErr: true }));
        break;
      default:
        unknownErr();
    }
  }, [signUpRespErr]);

  useEffect(() => {
    if (!hasSubmitted) return;
    if (!isSignUpRespDataValid(signUpRespData)) {
      return unknownErr();
    }
    storeSignUpRespData(signUpRespData);
    router.push("/notes");
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
        <div className="flex gap-2 items-center">
          <Loading />
          {t("checkingUsernameAvailability")}
        </div>
      );
    } else if (isObject(isUsernameAvailRespData)) {
      if ((isUsernameAvailRespData as UsernameAvailResp).ok) {
        return (
          <div className="flex gap-2 items-center">
            <CheckmarkIcon
              className="fill-l-success dark:fill-d-success flex-shrink-0"
              pxSize={24}
            />
            {t("usernameAvailable")}
          </div>
        );
      } else unknownErr();
    } else if (isUsernameAvailErr?.response?.status === 409) {
      return (
        <div className="flex gap-2 items-center">
          <ErrIcon
            pxSize={24}
            className="fill-l-error dark:fill-d-error flex-shrink-0"
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
      <form onSubmit={onFormSubmit} className="max-w-md flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="email">{t("emailLabel")}</label>
          <input
            className="px-3 py-2 rounded blue-outline"
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
            className="px-3 py-2 rounded blue-outline"
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
                <div className="w-full flex items-center justify-center">
                  <div className="relative w-[1.5rem] h-[1.5rem]">
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

function isSignUpRespDataValid(data: any) {
  if (
    !isObject(data) ||
    !data.accessToken ||
    !data.refreshToken ||
    !data.username
  ) {
    return false;
  }
  return true;
}

function storeSignUpRespData(data: any) {
  const daysIn15Mins = 0.010416;
  const ninetyDays = 90;
  const refreshToken = JSON.stringify(data.refreshToken);

  Cookies.set("accessToken", data.accessToken, {
    expires: daysIn15Mins,
  });
  Cookies.set("refreshToken", refreshToken, { expires: ninetyDays });
}

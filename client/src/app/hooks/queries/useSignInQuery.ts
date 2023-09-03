import { TSignInFormInputValues } from "@/app/[locale]/(main)/auth/sign-in/components/SignInForm";
import http from "@/utils/http/http";
import { getCaptchaTokenOrBypassToken } from "@/utils/getCaptchaTokenOrBypassToken";
import { authRespSchema, TAuthResp } from "@shared/types";
import { useQuery } from "@tanstack/react-query";
import { RefObject } from "react";
import ReCAPTCHA from "react-google-recaptcha";

interface TProps {
  formData: TSignInFormInputValues;
  captchaRef: RefObject<ReCAPTCHA>;
}

export default function useSignInQuery({ formData, captchaRef }: TProps) {
  async function fetchSignIn() {
    const objWithCaptchaTokenOrBypassToken = await getCaptchaTokenOrBypassToken(
      captchaRef,
    );
    const payload = {
      ...objWithCaptchaTokenOrBypassToken,
      ...formData,
    };

    const { data } = await http.post("/auth/sign-in", payload);

    const signInRespData = authRespSchema.parse(data);
    return signInRespData;
  }

  const query = useQuery<TAuthResp>(["signIn"], fetchSignIn, {
    enabled: false,
    retry: false,
  });

  return query;
}

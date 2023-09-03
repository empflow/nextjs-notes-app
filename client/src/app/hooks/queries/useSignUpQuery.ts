import { TSignUpFormInputValues } from "@/app/[locale]/(main)/auth/sign-up/components/SignUpForm";
import http from "@/utils/http/http";
import { getCaptchaTokenOrBypassToken } from "@/utils/getCaptchaTokenOrBypassToken";
import { authRespSchema, TAuthResp } from "@shared/respsSchemas";
import { useQuery } from "@tanstack/react-query";
import { RefObject } from "react";
import ReCAPTCHA from "react-google-recaptcha";

interface TProps {
  formData: TSignUpFormInputValues;
  captchaRef: RefObject<ReCAPTCHA>;
}

export default function useSignUpQuery({ formData, captchaRef }: TProps) {
  async function fetchSignUp() {
    const payload = await getPayload({ formData, captchaRef });
    const { data } = await http.post("/auth/sign-up", payload);

    const signUpRespData = authRespSchema.parse(data);
    return signUpRespData;
  }

  const query = useQuery<TAuthResp>(["signUp"], fetchSignUp, {
    enabled: false,
    retry: false,
  });

  return query;
}

async function getPayload({ captchaRef, formData }: TProps) {
  const objWithCaptchaTokenOrBypassToken = await getCaptchaTokenOrBypassToken(
    captchaRef,
  );
  return {
    ...objWithCaptchaTokenOrBypassToken,
    ...formData,
  };
}

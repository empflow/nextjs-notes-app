import { RefObject } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import getCaptchaToken from "./getCaptchaToken";
import isDev from "./isDev";

export async function getCaptchaTokenOrBypassToken(
  captchaRef: RefObject<ReCAPTCHA>,
) {
  if (isDev()) {
    const captchaBypassToken = process.env.NEXT_PUBLIC_CAPTCHA_BYPASS_TOKEN;
    return { captchaBypassToken };
  } else {
    const captchaToken = await getCaptchaToken(captchaRef);
    return { captchaToken };
  }
}

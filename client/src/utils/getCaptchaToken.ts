import { RefObject } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default async function getCaptchaToken(
  captchaRef: RefObject<ReCAPTCHA>
) {
  const token = await captchaRef.current?.executeAsync();
  captchaRef.current?.reset();

  return token;
}

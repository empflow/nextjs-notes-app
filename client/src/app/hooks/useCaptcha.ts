import getResolvedTheme from "@/utils/getResolvedTheme";
import { useTheme } from "next-themes";
import { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function useCaptcha() {
  const { resolvedTheme } = useTheme();
  const captchaTheme = getResolvedTheme(resolvedTheme);
  const captchaRef = useRef<ReCAPTCHA>(null);

  return { captchaRef, captchaTheme };
}

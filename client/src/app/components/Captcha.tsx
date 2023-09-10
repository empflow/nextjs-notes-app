import { forwardRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { TResolvedTheme } from "@/utils/types";

interface TProps {
  theme: TResolvedTheme;
}

const Captcha = forwardRef<ReCAPTCHA, TProps>(({ theme }, ref) => {
  return (
    <ReCAPTCHA
      sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY as string}
      size="invisible"
      ref={ref}
      theme={theme}
    />
  );
});

export default Captcha;

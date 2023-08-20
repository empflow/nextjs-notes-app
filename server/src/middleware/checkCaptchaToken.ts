import axios from "axios";
import { Request, Response, NextFunction } from "express";
import { BadRequestErr } from "../utils/errs";
import getEnvVar from "../utils/getEnvVar";

export default async function checkCaptchaToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { captchaToken, captchaBypassToken } = req.body;
  if (captchaBypassToken) {
    const actualBypassToken = getEnvVar("CAPTCHA_BYPASS_TOKEN");

    if (captchaBypassToken !== actualBypassToken) {
      throw new BadRequestErr("Invalid captcha bypass token");
    }

    return next();
  }

  if (!captchaToken) throw new BadRequestErr("No captcha token provided");

  const secret = getEnvVar("CAPTCHA_SECRET_KEY");

  const resp = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${captchaToken}`,
    {}
  );

  if (!resp.data.success) {
    throw new BadRequestErr("Captcha verification failed");
  }

  next();
}

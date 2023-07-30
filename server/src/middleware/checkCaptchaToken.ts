import axios from "axios";
import { Request, Response, NextFunction } from "express";
import { BadRequestErr } from "../utils/errs";
import getEnvVar from "../utils/getEnvVar";

export default async function checkCaptchaToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { captchaToken } = req.body;
  if (!captchaToken) throw new BadRequestErr("No captcha token provided");

  const secret = getEnvVar("RECAPTCHA_SECRET_KEY");

  const resp = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${captchaToken}`,
    {}
  );

  if (!resp.data.success) {
    throw new BadRequestErr("Captcha verification failed");
  }

  next();
}

import { TBooleanResp } from "@/shared/respSchemas/booleanResp";
import { Request, Response } from "express";
import User from "../../models/User";
import { BadRequestErr } from "../../utils/errs";

export default async function checkUsernameAvailability(
  req: Request,
  res: Response
) {
  const { username } = req.body;
  if (!username) throw new BadRequestErr("No username provided");
  const user = await User.findOne({ email: username });

  if (!user) {
    const resp: TBooleanResp = { ok: true };
    return res.json(resp);
  }

  const resp: TBooleanResp = { ok: false };
  return res.json(resp);
}

import { TUsernameAvailResp } from "@shared/types";
import { Request, Response } from "express";
import User from "../../models/User";
import { BadRequestErr } from "../../utils/errs";
import wait from "../../utils/wait";

export default async function checkUsernameAvailability(
  req: Request,
  res: Response
) {
  const { username } = req.body;
  if (!username) throw new BadRequestErr("No username provided");
  const user = await User.findOne({ email: username });

  await waitIfInDevMode();

  if (!user) {
    const resp: TUsernameAvailResp = { ok: true };
    return res.json(resp);
  }

  const resp: TUsernameAvailResp = { ok: false };
  return res.status(409).json(resp);
}

async function waitIfInDevMode() {
  if (process.env.NODE_ENV === "dev") {
    await wait(1000);
  }
}

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
    return res.json({ ok: true });
  }

  return res.status(409).json({ ok: false });
}

async function waitIfInDevMode() {
  if (process.env.NODE_ENV === "dev") {
    await wait(1000);
  }
}

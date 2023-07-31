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
    return res.json({ ok: true });
  }

  return res.status(409).json({ ok: false });
}

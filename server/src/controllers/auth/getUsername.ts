import { Request, Response } from "express";
import User from "../../models/User";
import { NotFoundErr } from "../../utils/errs";

export default async function getUsername(req: Request, res: Response) {
  const { userId } = res.locals.jwtPayload;
  const user = await User.findById(userId);
  if (!user) throw new NotFoundErr("user not found");

  res.json({
    username: user.email,
  });
}

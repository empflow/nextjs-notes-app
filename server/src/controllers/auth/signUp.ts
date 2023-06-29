import { Request, Response } from "express";
import User from "../../models/User";

export default async function signUp(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await User.create({ email, password });
  const token = user.getJwt();
  res.status(201).json({ token });
}

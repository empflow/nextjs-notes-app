import { Request, Response } from "express";
import User from "../../models/User";

export default async function signOut(req: Request, res: Response) {
  res.clearCookie("token");
  res.json({ ok: true });
}


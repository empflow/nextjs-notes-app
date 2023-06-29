import { Request, Response } from "express";
import { BadRequestErr } from "./errs";

export default function throwIfSomeAuthDataNotPresent(req: Request) {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestErr("Both email and password are required to sign up");
  }
}

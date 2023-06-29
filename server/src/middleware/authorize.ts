import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { BadRequestErr, UnauthorizedErr } from "../utils/errs";
import getEnvVar from "../utils/getEnvVar";
import throwIfInvalidObjectId from "../utils/throwers/throwIfInvalidObjectId";

export default async function authorize(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = validateAndGetToken(req);
  const payload = validateAndGetPayload(token);
  res.locals.jwtPayload = payload;
  next();
}

function validateAndGetToken(req: Request) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedErr("unauthorized");
  }
  return authHeader.split(" ")[1];
}

function validateAndGetPayload(token: string) {
  const JWT_SECRET = getEnvVar("JWT_SECRET");
  let payload: jwt.JwtPayload | string;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedErr("jwt verification failed");
  }

  validateJwtPayload(payload);
  return payload;
}

function validateJwtPayload(payload: jwt.JwtPayload | string) {
  if (typeof payload === "string") throw new BadRequestErr("invalid token");
  throwIfInvalidObjectId(payload.userId);
}

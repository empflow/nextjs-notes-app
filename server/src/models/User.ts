import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import getEnvVar from "../utils/getEnvVar";
import { emailRegex } from "../config/globalVars";
import {
  AccessTokenPayload,
  RefreshTokenForDb,
  RefreshTokenPayload,
} from "../types";
import getNodeEnv from "../utils/getNodeEnv";

interface GetRefreshTokenReturnVal {
  forDb: RefreshTokenForDb;
  plainTextToken: string;
}

export interface IUser extends Document {
  email: string;
  password: string;
  doPasswordsMatch: (password: string) => Promise<boolean>;
  getAccessToken: () => string;
  getRefreshToken: () => Promise<GetRefreshTokenReturnVal>;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      match: emailRegex,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isNew) return next();
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.doPasswordsMatch = function (passwordToCheck: string) {
  return bcrypt.compare(passwordToCheck, this.password);
};

UserSchema.methods.getAccessToken = function (): string {
  const nodeEnv = getEnvVar("NODE_ENV");
  const secret = getEnvVar("ACCESS_TOKEN_SECRET");
  const expiresIn = getAccessTokenExpiresIn();
  const payload: AccessTokenPayload = { userId: this._id };
  return jwt.sign(payload, secret, { expiresIn });
};

UserSchema.methods.getRefreshToken =
  async function (): Promise<GetRefreshTokenReturnVal> {
    const nodeEnv = getEnvVar("NODE_ENV");
    const secret = getEnvVar("REFRESH_TOKEN_SECRET");
    const tokenPayload: RefreshTokenPayload = { userId: this._id };
    const expiresIn = getRefreshTokenExpiresIn();
    const tokenPlainText = jwt.sign(tokenPayload, secret, { expiresIn });
    const tokenHash = await bcrypt.hash(tokenPlainText, 10);
    const createdAt = Date.now();
    return { forDb: { tokenHash, createdAt }, plainTextToken: tokenPlainText };
  };

const User = mongoose.model("User", UserSchema);

export default User;

function getRefreshTokenExpiresIn() {
  if (getNodeEnv() === "dev") {
    return getEnvVar("DEVELOPMENT_REFRESH_TOKEN_EXPIRES_IN");
  } else {
    return getEnvVar("PRODUCTION_REFRESH_TOKEN_EXPIRES_IN");
  }
}

function getAccessTokenExpiresIn() {
  if (getNodeEnv() === "dev") {
    return getEnvVar("DEVELOPMENT_ACCESS_TOKEN_EXPIRES_IN");
  } else {
    return getEnvVar("PRODUCTION_ACCESS_TOKEN_EXPIRES_IN");
  }
}

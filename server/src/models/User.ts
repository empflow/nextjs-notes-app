import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import getEnvVar from "../utils/getEnvVar";
import { emailRegex } from "../config/globalVars";

export interface IUser extends Document {
  email: string;
  password: string;
  doPasswordsMatch: (password: string) => boolean;
  getJwt: () => string;
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

UserSchema.methods.getJwt = function () {
  const jwtSecret = getEnvVar("JWT_SECRET");
  const jwtExpiresIn = getEnvVar("JWT_EXPIRES_IN");
  return jwt.sign({ userId: this._id }, jwtSecret, { expiresIn: jwtExpiresIn });
};

const User = mongoose.model("User", UserSchema);

export default User;

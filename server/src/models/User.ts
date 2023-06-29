import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export interface IUserSchema extends Document {
  email: string;
  password: string;
  doPasswordsMatch: (password: string) => boolean;
}

const UserSchema = new mongoose.Schema<IUserSchema>({
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
});

const User = mongoose.model("User", UserSchema);

UserSchema.pre("save", async function (next) {
  if (!this.isNew) return next();
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.doPasswordsMatch = function (passwordToCheck: string) {
  return bcrypt.compare(passwordToCheck, this.password);
};

export default User;

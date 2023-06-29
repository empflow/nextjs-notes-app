import mongoose from "mongoose";

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export interface IUserSchema {
  email: string;
  password: string;
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

export default User;

// TODO: add password hashing using bcrypt

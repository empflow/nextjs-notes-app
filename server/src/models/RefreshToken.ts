import mongoose from "mongoose";
import { RefreshTokenForDb } from "../types";

const RefreshTokenSchema = new mongoose.Schema<RefreshTokenForDb>({
  tokenHash: {
    required: true,
    type: String
  },
  createdAt: {
    required: true,
    type: Number
  }
})

const RefreshToken = mongoose.model<RefreshTokenForDb>("RefreshToken", RefreshTokenSchema);
export default RefreshToken;

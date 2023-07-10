import mongoose from "mongoose";
import { AccessTokenPayload, RefreshTokenForClient, RefreshTokenForDb, RefreshTokenPayload } from "../types";

const RefreshTokenSchema = new mongoose.Schema<RefreshTokenForDb>({
  uuid: {
    required: true,
    type: String
  },
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

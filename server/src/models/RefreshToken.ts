import mongoose from "mongoose";
import { TRefreshTokenForDb } from "../utils/types";

const RefreshTokenSchema = new mongoose.Schema<TRefreshTokenForDb>({
  tokenHash: {
    required: true,
    type: String,
  },
  createdAt: {
    required: true,
    type: Number,
  },
});

const RefreshToken = mongoose.model<TRefreshTokenForDb>(
  "RefreshToken",
  RefreshTokenSchema
);
export default RefreshToken;

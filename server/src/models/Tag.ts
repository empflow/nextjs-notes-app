import mongoose, { Schema, Types } from "mongoose";

export interface TTag {
  name: string;
  color: string;
  owner: Types.ObjectId;
}

const TagSchema = new mongoose.Schema<TTag>({
  name: {
    required: true,
    type: String,
  },
  color: {
    required: true,
    type: String,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Tag = mongoose.model<TTag>("Tag", TagSchema);
export default Tag;

import mongoose, { Schema, Types } from "mongoose";

interface ITag {
  name: string;
  color: string;
  owner: Types.ObjectId;
}

const TagSchema = new mongoose.Schema<ITag>({
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

const Tag = mongoose.model<ITag>("Tag", TagSchema);
export default Tag;

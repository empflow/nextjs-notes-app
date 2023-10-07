import { TTagSchemaBase } from "@/shared/schemas";
import mongoose, { Schema, Types } from "mongoose";

export interface TTagServer extends TTagSchemaBase {
  owner: Types.ObjectId;
}

const TagSchema = new mongoose.Schema<TTagServer>({
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

const Tag = mongoose.model<TTagServer>("Tag", TagSchema);
export default Tag;

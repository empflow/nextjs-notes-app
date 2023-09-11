import { TNoteSchemaBase } from "@shared/schemas";
import mongoose, { Schema, Types } from "mongoose";

export interface TNoteServer extends TNoteSchemaBase {
  owner: Types.ObjectId;
  tags: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema = new Schema<TNoteServer>(
  {
    title: {
      type: String,
      default: null,
    },
    content: {
    description: {
      type: String,
      required: true,
      default: null,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isInTrash: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
      default: [],
    },
  },
  { timestamps: true }
);

const Note = mongoose.model<TNoteServer>("Note", NoteSchema);

export default Note;

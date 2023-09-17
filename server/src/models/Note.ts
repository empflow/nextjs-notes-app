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
      type: Schema.Types.Mixed,
      default: null,
    },
    description: {
      type: String,
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
    clientId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Note = mongoose.model<TNoteServer>("Note", NoteSchema);

export default Note;

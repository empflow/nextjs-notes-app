import mongoose, { Document, Schema, Types } from "mongoose";

export interface INote extends Document {
  title: string;
  content: string;
  owner: Types.ObjectId | string;
  isInTrash: boolean;
  tags: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
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

const Note = mongoose.model<INote>("Note", NoteSchema);

export default Note;

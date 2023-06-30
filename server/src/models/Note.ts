import mongoose, { Document, Schema, Types } from "mongoose";

interface INote extends Document {
  title: string;
  content: string;
  owner: Types.ObjectId | string;
  isInTrash: boolean;
  tags: string[];
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
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Note = mongoose.model<INote>("Note", NoteSchema);

export default Note;

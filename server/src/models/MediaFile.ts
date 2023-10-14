import { TMediaFileSchemaBase } from "@/shared/schemas/mediaFile";
import mongoose, { Schema, Types } from "mongoose";

export interface TMediaFileServer extends TMediaFileSchemaBase {
  owner: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const MediaFileSchema = new Schema<TMediaFileServer>(
  {
    placeholderImgBase64: {
      type: String,
      default: null,
    },
    url: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const MediaFile = mongoose.model<TMediaFileServer>(
  "MediaFile",
  MediaFileSchema
);

export default MediaFile;

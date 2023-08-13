import mongoose from "mongoose";

interface ITag {
  name: string;
  color: string;
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
});

const Tag = mongoose.model<ITag>("Tag", TagSchema);
export default Tag;

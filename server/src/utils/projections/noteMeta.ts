import { ProjectionType } from "mongoose";
import { TNote } from "../../models/Note";

const noteMetaProjection: ProjectionType<TNote> = {
  content: 0,
};

export default noteMetaProjection;

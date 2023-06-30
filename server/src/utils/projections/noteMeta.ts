import { ProjectionType } from "mongoose";
import { INote } from "../../models/Note";

const noteMetaProjection: ProjectionType<INote> = {
  content: 0,
};

export default noteMetaProjection;

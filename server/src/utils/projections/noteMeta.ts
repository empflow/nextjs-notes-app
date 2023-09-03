import { ProjectionType } from "mongoose";
import { TNoteServer } from "../../models/Note";

const noteMetaProjection: ProjectionType<TNoteServer> = {
  content: 0,
};

export default noteMetaProjection;

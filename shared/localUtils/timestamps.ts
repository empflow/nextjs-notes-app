import { z } from "zod";
import { isoDateRegex } from "../regexes";

const timestamps = {
  createdAt: z.string().regex(isoDateRegex),
  updatedAt: z.string().regex(isoDateRegex),
};

export default timestamps;

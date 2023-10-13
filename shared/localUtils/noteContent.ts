import { z } from "zod";
import { JSONContent as TNoteJsonContent } from "@tiptap/react";

const noteContent: z.ZodType<TNoteJsonContent> = z.lazy(() =>
  z.object({
    type: z.string().optional(),
    attrs: z.record(z.unknown()).optional(),
    content: noteContent.array().optional(),
    marks: z.any(),
    text: z.string().optional(),
  })
);

export default noteContent;

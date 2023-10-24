import { JSONContent } from "@tiptap/react";

export const minPasswordLength = 8;
export const maxPasswordLength = 32;

export const twBreakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export const maxImgSizeInMb = 15;

export const ALLOWED_IMG_EXTS = ["jpeg", "jpg", "png", "webp", "avif", "gif"];

export const initNoteContent: JSONContent = {
  type: "doc",
  content: [{ type: "heading", attrs: { level: 1 } }],
};

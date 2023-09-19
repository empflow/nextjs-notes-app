import { JSONContent } from "@tiptap/react";

type TFindTitleAndDescriptionInContentReturnT = {
  title: string | null;
  description: string | null;
};

export default function findTitleAndDescriptionInContent(
  content: JSONContent
): TFindTitleAndDescriptionInContentReturnT {
  let title: string | null = null;
  let description: string | null = null;

  function traverseContent(content: JSONContent) {
    const isDone = !!title && !!description;
    if (isDone) return;

    if (content.text) {
      if (!title) title = content.text.trim();
      else if (!description) description = content.text.trim();
    }

    if (content.content) {
      for (const childContent of content.content) {
        traverseContent(childContent);
      }
    }
  }

  traverseContent(content);
  return { title, description };
}

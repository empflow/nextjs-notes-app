import { mergeAttributes, Node, nodeInputRule } from "@tiptap/react";
import { ReactNodeViewRenderer } from "@tiptap/react";
import NextImageComponent from "./Component";

export interface TNextImageOptions {
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/react" {
  interface Commands<ReturnType> {
    image: {
      setNextImage: (options: { id: string | null }) => ReturnType;
    };
  }
}

export const inputRegex =
  /(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/;

export const NextImage = Node.create<TNextImageOptions>({
  name: "nextImage",

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  draggable: true,

  inline: false,
  group: "block",

  addAttributes() {
    return {
      id: null,
      width: null,
      height: null,
    };
  },

  parseHTML() {
    return [{ tag: "img[src]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "img",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    ];
  },

  // @ts-ignore
  addNodeView() {
    return ReactNodeViewRenderer(NextImageComponent);
  },

  addCommands() {
    return {
      setNextImage:
        (options) =>
        ({ commands, state }) => {
          const { from, to } = state.selection;
          const selection = { from, to };
          commands.insertContentAt(selection, {
            type: this.name,
            attrs: options,
          });
          return true;
        },
    };
  },

  addInputRules() {
    return [
      nodeInputRule({
        find: inputRegex,
        type: this.type,
        getAttributes: (match) => {
          const [_, alt, src, title] = match;

          return { src, alt, title };
        },
      }),
    ];
  },
});

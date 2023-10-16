import { mergeAttributes, Node, nodeInputRule } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import NextImageComponent from "./Component";

export interface TNextImageOptions {
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
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
      src: {
        default: undefined,
      },
      alt: {
        default: undefined,
      },
      title: {
        default: undefined,
      },
      blurDataURL: {
        default: undefined,
      },
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

  addStorage() {
    return {
      id: null,
    };
  },

  // @ts-ignore
  addNodeView: function () {
    return ReactNodeViewRenderer(NextImageComponent);
  },

  addCommands() {
    return {
      setNextImage:
        (options) =>
        ({ commands }) => {
          this.storage.id = options.id;
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
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

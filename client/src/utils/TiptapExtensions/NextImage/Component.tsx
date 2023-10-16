import useMediaFileQuery from "@/app/hooks/queries/useMediaFileQuery";
import useRerender from "@/app/hooks/useRerender";
import { useQuery } from "@tanstack/react-query";
import { NodeViewWrapper } from "@tiptap/react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface TProps {
  node: {
    attrs: {
      src: string;
      alt?: string;
      blurDataURL?: string;
      title?: string;
    };
  };
  extension: {
    storage: {
      id: string | null;
    };
  };
}

export default function NextImageComponent({
  extension: {
    storage: { id },
  },
}: TProps) {
  const rerender = useRerender();
  const { data, isLoading, isError, error } = useMediaFileQuery(id);

  console.log(data);

  useEffect(rerender, [id]);

  return (
    <NodeViewWrapper>
      <div className="relative max-h-[100px] max-w-full">
        {id}
        {/* <Image
          alt={alt ?? "Image"}
          src={src}
          title={title}
          placeholder="blur"
          blurDataURL={blurDataURL}
          fill={true}
        /> */}
      </div>
    </NodeViewWrapper>
  );
}

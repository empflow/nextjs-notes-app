import useMediaFileQuery from "@/app/hooks/queries/useMediaFileQuery";
import useRerender from "@/app/hooks/useRerender";
import { NodeViewWrapper } from "@tiptap/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import NextImageSkeleton from "./Skeleton";
import styles from "./styles.module.css";

interface TProps {
  node: {
    attrs: {
      id: string | null;
      height: number | null;
      width: number | null;
    };
  };
  updateAttributes: (attrs: Record<string, unknown>) => unknown;
}

export default function NextImageComponent({
  node: {
    attrs: { width, height, id },
  },
  updateAttributes,
}: TProps) {
  const errsT = useTranslations("Errors");
  const t = useTranslations("Editor");
  const { data, isLoading: isLoadingUrl, isError } = useMediaFileQuery(id);
  const aspectRatio = width && height ? width / height : undefined;
  const loadingOrErrStyle = {
    aspectRatio,
    height: aspectRatio ? undefined : 200,
  };
  const [hasImageLoaded, setHasImageLoaded] = useState(true);

  let content: ReactNode;

  if (isError) {
    content = <div style={loadingOrErrStyle}>{errsT("image")}</div>;
  } else if (isLoadingUrl) {
    content = <Skeleton style={loadingOrErrStyle} />;
  } else if (!data) content = <Skeleton style={loadingOrErrStyle} />;
  else
    content = (
      <Image
        alt={t("image")}
        src={data.url}
        placeholder="blur"
        blurDataURL={data.placeholderImgBase64}
        fill={true}
        className={styles.image}
        style={{
          aspectRatio: hasImageLoaded ? aspectRatio ?? undefined : undefined,
          display: "block",
        }}
        onLoadingComplete={({ naturalWidth, naturalHeight }) => {
          setHasImageLoaded(true);
          console.log("hello");
          if (!height || !width) {
            updateAttributes({ width: naturalWidth, height: naturalHeight });
          }
        }}
      />
    );

  return <NodeViewWrapper>{content}</NodeViewWrapper>;
}

import useMediaFileQuery from "@/app/hooks/queries/useMediaFileQuery";
import useGetContext from "@/app/hooks/useGetContext";
import NotesContext from "@/contexts/NotesContext";
import { NodeViewWrapper } from "@tiptap/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
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
  const defaultImgHeightPx = 500;
  const imgMaxWidthPx = 700;
  const loadingOrErrStyle = {
    aspectRatio,
    height: aspectRatio ? undefined : defaultImgHeightPx,
    maxWidth: imgMaxWidthPx,
  };
  const [hasImageLoaded, setHasImageLoaded] = useState(false);
  const { selectedNoteId } = useGetContext(NotesContext);

  useEffect(() => {
    setHasImageLoaded(false);
  }, [selectedNoteId]);

  let content: ReactNode;

  if (isError) {
    content = <div style={loadingOrErrStyle}>{errsT("image")}</div>;
  } else if (isLoadingUrl || !data) {
    content = <Skeleton style={loadingOrErrStyle} />;
  } else
    content = (
      <Image
        alt={t("image")}
        src={data.url}
        placeholder="blur"
        blurDataURL={data.placeholderImgBase64}
        fill={true}
        className={styles.image}
        style={{
          aspectRatio: aspectRatio ?? undefined,
          display: "block",
          maxWidth: imgMaxWidthPx,
        }}
        onLoadingComplete={({ naturalWidth, naturalHeight }) => {
          setHasImageLoaded(true);
          if (!height || !width) {
            updateAttributes({ width: naturalWidth, height: naturalHeight });
          }
        }}
      />
    );

  return (
    <NodeViewWrapper>
      <div className="overflow-hidden">
        <div
          className="duration-200"
          style={{
            filter: hasImageLoaded || !data ? undefined : "blur(8px)",
          }}
        >
          {content}
        </div>
      </div>
    </NodeViewWrapper>
  );
}

import { CSSProperties } from "react";

interface Props {
  parentStyle?: CSSProperties;
  childStyle?: CSSProperties;
  pxSize?: number;
  foregroundColor?: string;
  backgroundColor?: string;
}
export default function Loading(props: Props) {
  const {
    pxSize = 25,
    childStyle,
    parentStyle,
    backgroundColor,
    foregroundColor,
  } = props;
  const colorStyleAttr: CSSProperties = {
    borderColor: backgroundColor,
    borderTopColor: foregroundColor,
  };

  return (
    <div
      className={`relative flex items-center justify-center`}
      style={{ ...parentStyle, width: pxSize, height: pxSize }}
    >
      <div
        style={{ ...colorStyleAttr, ...childStyle }}
        className={`absolute bottom-0 left-0 right-0 top-0 animate-spin rounded-full border-4 border-light-xl-gray border-t-l-accent dark:border-dark-xl-gray dark:border-t-d-accent`}
      ></div>
    </div>
  );
}

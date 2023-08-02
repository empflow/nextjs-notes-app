import { CSSProperties } from "react";

interface Props {
  parentStyle?: CSSProperties;
  childStyle?: CSSProperties;
  pxSize?: number;
}
/**
 *  usage: put this component inside an element with `display: relative` and set width and height
 *  also you most likely need to use `display: flex; align-items: center; justify-content: center;` to center the spinner
 */
export default function Loading(props: Props) {
  const { pxSize = 25, childStyle, parentStyle } = props;

  return (
    <div
      className={`relative flex justify-center items-center`}
      style={{ ...parentStyle, width: pxSize, height: pxSize }}
    >
      <div
        style={childStyle}
        className={`absolute top-0 bottom-0 left-0 right-0 border-4 dark:border-dark-xl-gray border-t-l-accent border-light-xl-gray dark:border-t-d-accent animate-spin rounded-full`}
      ></div>
    </div>
  );
}

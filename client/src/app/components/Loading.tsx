import { CSSProperties } from "react";
import { Style } from "util";

interface Props {
  className?: string;
  style?: CSSProperties;
}
/**
 *  usage: put this component inside an element with `display: relative` and set width and height manually like `width: 25px`
 *  also you might need to use `display: flex; align-items: center; justify-content: center;` if you need to center the spinner
 */
export default function Loading(props: Props) {
  const { className, style } = props;

  return (
    <div
      style={style}
      className={`absolute top-0 bottom-0 left-0 right-0 border-4 dark:border-dark-xl-gray border-t-l-accent border-light-xl-gray dark:border-t-d-accent animate-spin rounded-full ${className}`}
    ></div>
  );
}

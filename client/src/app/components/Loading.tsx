interface Props {
  className?: string;
}
/**
 *  usage: put this component inside an element with `display: relative` and set width and height manually like `width: 25px`
 */
export default function Loading(props: Props) {
  const { className } = props;

  return (
    <div
      className={`absolute top-0 bottom-0 left-0 right-0 border-4 dark:border-dark-xl-gray border-t-l-accent border-light-xl-gray dark:border-t-d-accent animate-spin rounded-full ${className}`}
    ></div>
  );
}

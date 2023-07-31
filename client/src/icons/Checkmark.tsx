interface Props {
  pxSize?: number;
  className?: string;
}

export default function CheckmarkIcon({ pxSize, className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      height={pxSize}
      width={pxSize}
      className={className}
    >
      <path d="M378-222 130-470l68-68 180 180 383-383 68 68-451 451Z" />
    </svg>
  );
}

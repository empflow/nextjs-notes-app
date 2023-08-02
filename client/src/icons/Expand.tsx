interface Props {
  pxSize?: number;
  className?: string;
}

export default function ExpandIcon({ pxSize, className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={pxSize}
      viewBox="0 -960 960 960"
      width={pxSize}
      className={className}
    >
      <path d="M480-322 216-586l67-67 197 198 197-197 67 67-264 263Z" />
    </svg>
  );
}

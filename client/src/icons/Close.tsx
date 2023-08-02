interface Props {
  pxSize?: number;
  className?: string;
}

export default function CloseIcon({ pxSize, className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      height={pxSize}
      width={pxSize}
      className={className}
    >
      <path d="m249-183-66-66 231-231-231-231 66-66 231 231 231-231 66 66-231 231 231 231-66 66-231-231-231 231Z" />
    </svg>
  );
}

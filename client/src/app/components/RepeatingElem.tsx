import getIterable from "@/utils/getIterable";
import { Fragment, ReactNode } from "react";

type TProps = {
  count: number;
  elem: ReactNode;
};

export default function RepeatingElem({ count, elem }: TProps) {
  const iterable = getIterable(count);

  return (
    <>
      {iterable.map((_, i) => (
        <Fragment key={i}>{elem}</Fragment>
      ))}
    </>
  );
}

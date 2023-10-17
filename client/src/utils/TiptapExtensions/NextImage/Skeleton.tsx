import { useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";

interface TProps {
  style: Record<string, unknown>;
}

export default function NextImageSkeleton({ style }: TProps) {
  const [skeletonHeight, setSkeletonHeight] = useState(0);
  const skeletonWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setSkeletonHeight(skeletonWrapperRef.current?.offsetHeight ?? 0);
  }, [style]);

  return (
    <div style={style} ref={skeletonWrapperRef}>
      <Skeleton height={skeletonHeight} />
    </div>
  );
}

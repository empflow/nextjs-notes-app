import RepeatingElem from "@/app/components/RepeatingElem";
import Skeleton from "react-loading-skeleton";

export default function TagsLoading() {
  const elem = (
    <div>
      <Skeleton />
    </div>
  );
  return <RepeatingElem elem={elem} count={10} />;
}

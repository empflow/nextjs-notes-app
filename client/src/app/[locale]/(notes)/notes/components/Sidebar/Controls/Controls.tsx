import AddNoteBtn from "./AddNoteBtn";
import CurrTag from "./CurrTag";
import FilterBtn from "./FilterBtn";

export default function Controls() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <CurrTag />
        <AddNoteBtn />
      </div>
      <FilterBtn />
    </div>
  );
}

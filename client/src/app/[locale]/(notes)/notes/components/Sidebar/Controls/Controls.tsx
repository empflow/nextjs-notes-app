import EditBtn from "./EditBtn";
import AddNoteBtn from "./AddNoteBtn";
import CurrTag from "./CurrTag";
import FilterBtn from "./FilterBtn";

export default function Controls() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <CurrTag />
          <AddNoteBtn />
        </div>
        <FilterBtn />
      </div>
      <EditBtn />
    </div>
  );
}

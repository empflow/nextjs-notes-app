import EditBtn from "./EditBtn";
import AddNoteBtn from "./AddNoteBtn";
import CurrTag from "./CurrTag";
import FilterBtn from "./FilterBtn";

export default function Controls() {
  return (
    <div className="sticky top-0 flex flex-col gap-8 border-b border-light-3xl-gray bg-white p-5 dark:border-dark-4xl-gray dark:bg-d-main">
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

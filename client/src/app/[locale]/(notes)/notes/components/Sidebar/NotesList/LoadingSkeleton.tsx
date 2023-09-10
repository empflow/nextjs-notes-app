import arrOfLength from "@/utils/arrOfLength";

export default function NotesListLoadingSkeleton() {
  return (
    <div className="flex flex-grow flex-col">
      {arrOfLength(15).map((_item, i) => (
        <NoteSkeleton key={i} />
      ))}
    </div>
  );
}

// TODO: finish adding NotesListLoadingSkeleton
// TODO: use react-loading-skeleton instead!!!
function NoteSkeleton() {
  return (
    <div
      className={`flex flex-col gap-[0.2rem] rounded-t border-b border-light-2xl-gray p-[14px] dark:border-dark-3xl-gray`}
    >
      <div className="h-[0.9rem] rounded bg-light-gray"></div>
      <div className="h-[0.9rem] rounded bg-light-gray"></div>
    </div>
  );
}

import Loading from "@/app/components/Loading";

export default function NotesLoading() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center">
      <Loading childStyle={{ borderWidth: 5 }} pxSize={40} />
    </div>
  );
}

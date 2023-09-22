import isSignedIn from "@/utils/isSignedIn";
import Link from "next/link";

export default function NotesLink() {
  if (!isSignedIn()) return null;
  return <Link href="/notes">Notes</Link>;
}

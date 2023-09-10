import isSignedIn from "@/utils/isSignedIn";
import Link from "next/link";

export default async function NotesLink() {
  if (!(await isSignedIn())) return null;
  return <Link href="/notes">Notes</Link>;
}

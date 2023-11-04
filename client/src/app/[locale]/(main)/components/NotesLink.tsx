import isSignedIn from "@/utils/isSignedIn";
import { Link } from "@/i18nUtils";

export default function NotesLink() {
  if (!isSignedIn()) return null;
  return <Link href="/notes">Notes</Link>;
}

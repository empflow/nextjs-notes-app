import protectedPage from "@/utils/protectedPage";
import NotesPageContent from "./pageContent";

export default function Notes() {
  protectedPage();
  return <NotesPageContent />;
}

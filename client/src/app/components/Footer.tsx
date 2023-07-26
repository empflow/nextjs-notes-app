import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      made by{" "}
      <Link
        target="_blank"
        href="https://github.com/empflow"
        className="underline hover:text-blue-600"
      >
        me
      </Link>
    </footer>
  );
}

import NameOrSignInButton from "./components/NameOrSignInButton";
import "./globals.css";
export const metadata = {
  title: "Notes",
  description: "Made by GitHub @empflow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <h2>Notes app</h2>
          <div>
            <NameOrSignInButton />
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}

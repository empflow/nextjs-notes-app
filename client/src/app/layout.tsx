import Main from "./components/Main";
import Footer from "./components/Footer";
import Header from "./components/Header";
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
      <body className="flex flex-col min-h-screen">
        <Header />
        <Main>{children}</Main>
        <Footer />
      </body>
    </html>
  );
}

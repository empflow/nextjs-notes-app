import "./globals.css";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Providers from "./providers";

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
        <Providers>
          <Header />
          <Main>{children}</Main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

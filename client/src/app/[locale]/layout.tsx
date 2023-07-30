import "../globals.css";
import Main from "../components/Main";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Providers from "../providers";
import { notFound } from "next/navigation";
import { useLocale } from "next-intl";

export const metadata = {
  title: "Notes",
  description: "Made by GitHub @empflow",
};

interface RootLayoutContext {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default function RootLayout({ children, params }: RootLayoutContext) {
  const locale = useLocale();

  if (params.locale !== locale) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
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

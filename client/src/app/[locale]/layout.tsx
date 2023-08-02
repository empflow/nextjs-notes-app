import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import Main from "../components/Main";
import Footer from "../components/Footer";
import Header from "../components/Header/Header";
import Providers from "../providers";
import { notFound } from "next/navigation";
import { useLocale } from "next-intl";
import locales from "@/config/locales";

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

export default async function RootLayout({
  children,
  params,
}: RootLayoutContext) {
  const locale = useLocale();

  if (params.locale !== locale) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (err) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <Header />
            <Main>{children}</Main>
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

import "../globals.css";
import "react-toastify/dist/ReactToastify.css";
import { NextIntlClientProvider, useLocale } from "next-intl";
import { notFound } from "next/navigation";
import { ToastContainer } from "react-toastify";
import ThemeProviders from "../providers/ThemeProviders";
import ReactQueryProviders from "../providers/ReactQueryProviders";

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
      <body className="flex min-h-screen flex-col">
        <ReactQueryProviders>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <ThemeProviders>{children}</ThemeProviders>
            <ToastContainer hideProgressBar autoClose={3000} />
          </NextIntlClientProvider>
        </ReactQueryProviders>
      </body>
    </html>
  );
}

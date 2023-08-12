import "../globals.css";
import "react-toastify/dist/ReactToastify.css";
import { NextIntlClientProvider, useLocale } from "next-intl";
import { notFound } from "next/navigation";
import { ToastContainer } from "react-toastify";
import Providers from "../providers";

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
  console.log(locale);

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
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>{children}</Providers>
          <ToastContainer hideProgressBar autoClose={3000} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

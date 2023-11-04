import "../globals.css";
import "../globalStyles/reactLoadingSkeleton.css";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { ToastContainer } from "react-toastify";
import ThemeProviders from "../providers/ThemeProviders";
import ReactQueryProviders from "../providers/ReactQueryProviders";
import { locales, timeZone } from "@/config";
import { unstable_setRequestLocale } from "next-intl/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notes",
  description: "Made by GitHub @empflow",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface RootLayoutContext {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default async function RootLayout({
  children,
  params: { locale },
}: RootLayoutContext) {
  if (!locales.includes(locale as any)) notFound();
  unstable_setRequestLocale(locale);

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (err) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <ThemeProviders>
          <ReactQueryProviders>
            <NextIntlClientProvider {...{ timeZone, locale, messages }}>
              {children}
              <ToastContainer hideProgressBar autoClose={3000} />
            </NextIntlClientProvider>
          </ReactQueryProviders>
        </ThemeProviders>
        <div id="popover-overlays"></div>
        <div id="modals"></div>
      </body>
    </html>
  );
}

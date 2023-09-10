import "../globals.css";
import "../globalStyles/reactLoadingSkeleton.css";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import { NextIntlClientProvider, useLocale } from "next-intl";
import { notFound } from "next/navigation";
import { ToastContainer } from "react-toastify";
import ThemeProviders from "../providers/ThemeProviders";
import ReactQueryProviders from "../providers/ReactQueryProviders";
import SkeletonThemeProviders from "../providers/SkeletonThemeProviders";

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

  // no idea what this is honestly but i saw this in the docs
  if (params.locale !== locale) notFound();

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
            <NextIntlClientProvider locale={locale} messages={messages}>
              <SkeletonThemeProviders>
                {children}
                <ToastContainer hideProgressBar autoClose={3000} />
              </SkeletonThemeProviders>
            </NextIntlClientProvider>
          </ReactQueryProviders>
        </ThemeProviders>
      </body>
    </html>
  );
}

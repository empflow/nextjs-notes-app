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
        <main>{children}</main>
      </body>
    </html>
  );
}

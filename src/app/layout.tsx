import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TV Show Explorer App",
  description: "Explore Power Puff Girls show and episodes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="border-b p-4">
          <nav aria-label="Main">
            <a href="/show" className="font-semibold">
              TV Show Explorer
            </a>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}

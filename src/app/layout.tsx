import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Solace Candidate Assignment",
  description: "Show us what you got",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-blue-50 min-h-screen`}>
        <div className="container mx-auto p-6">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

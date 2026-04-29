import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FinanzPilot | Banking Admin Dashboard",
  description: "Ein moderner Finanzstand fuer PC, Handy und iPad.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-background">
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="min-w-0 flex-1 pb-20 lg:pb-0">{children}</main>
        </div>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import TopBar from "@/components/TopBar";
import Sidebar from "@/components/Sidebar";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "PraDika.dev",
  description: "Portfolio of PraDika — a developer who codes like an RPG protagonist.",
  keywords: ["portfolio", "developer", "web", "PraDika", "React", "Next.js"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased">
        <ThemeProvider>
          <CustomCursor />
          <TopBar />
          <Sidebar />
          <main className="main-content flex-1">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}

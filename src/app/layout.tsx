import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LVLHUB AI Content Engine",
  description: "AI-powered content generation and management platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AppProvider>
          <div className="flex h-screen bg-gray-50">
            <LeftSidebar />
            <main className="flex-1 overflow-y-auto p-6">
              {children}
            </main>
            <RightSidebar />
          </div>
          <Toaster position="top-right" />
        </AppProvider>
      </body>
    </html>
  );
}

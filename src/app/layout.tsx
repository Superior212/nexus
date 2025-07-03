import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { HydrationProvider } from "@/components/hydration-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NEXUS",
  description: "Manage company expenses, budgets, and financial reports",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <main className="flex-1  dark:bg-brand-dark light:bg-brand-light">
              <HydrationProvider>{children}</HydrationProvider>
            </main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}

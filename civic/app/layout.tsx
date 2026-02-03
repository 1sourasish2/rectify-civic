"use client";

// @ts-ignore: CSS module import type declarations
import './globals.css';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { AuthProvider } from '@/components/context/AuthProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Redirect "/" → "/signup"
  useEffect(() => {
    if (pathname === "/") {
      router.replace("/signup");
    }
  }, [pathname, router]);

  // Hide Navbar + Footer on login & signup pages
  const hideLayout = pathname === "/signup" || pathname === "/";

  return (
    <html lang="en">
      <body>
        {!hideLayout && <Navbar />}
        <main><AuthProvider>{children}</AuthProvider></main>
        {!hideLayout && <Footer />}
      </body>
    </html>
  );
}

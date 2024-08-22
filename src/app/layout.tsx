import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "react-toastify/dist/ReactToastify.css";
import { ViewTransitions } from "next-view-transitions";
import { ValidateAuth } from "@/services/validateAuth";
import { ToastContainer } from "react-toastify";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Administracion John Pellegrini",
  description: "Administracion John Pellegrini",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased dark",
            fontSans.variable
          )}
        >
          <ValidateAuth>{children}</ValidateAuth>
          <ToastContainer />
        </body>
      </html>
    </ViewTransitions>
  );
}

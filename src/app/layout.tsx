import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "react-toastify/dist/ReactToastify.css";
import { ValidateAuth } from "@/shared/services/validateAuth";
import { ViewTransitions } from "next-view-transitions";

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
        </body>
      </html>
    </ViewTransitions>
  );
}

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {ThemeProvider} from "@/components/custom/theme-provider";
import ConsolePrint from "@/components/custom/consolePrint";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: 'Redirect Checker Tool - Verify URL Redirects Easily',
  description: 'Quickly verify URL redirects with our tool. Upload a CSV file and download results instantly.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} w-full antialiased`}>
          <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          <ConsolePrint/>
      </body>
    </html>
  );
}

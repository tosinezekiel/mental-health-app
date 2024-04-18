"use client" 

import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { NextUIProvider } from '@nextui-org/react'
import Head from "next/head";

import { TRPCReactProvider } from "~/trpc/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const metadata = {
  title: "Mental Health App",
  description: "This is a project for hackathon",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <main>
          <div className="flex min-h-screen flex-col">
            <main className="container mx-auto max-w-7xl flex-grow p-4">
              <NextUIProvider>
                <TRPCReactProvider>{children}</TRPCReactProvider>
              </NextUIProvider>
            </main>
            <footer className="px-6 py-4 text-center">
              Made with ❤️
            </footer>
          </div>
        </main>
      </body>
    </html>
  );
}

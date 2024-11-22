"use client";
import React from "react";
import localFont from "next/font/local";
import "./globals.css";

import { metadata } from "./metadata";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isClient, setisClient] = React.useState(false);

  React.useEffect(() => {
    setisClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <html lang="en">
      <body className={`antialiased`}>
        <main className="flex flex-col items-center">{children}</main>
      </body>
    </html>
  );
}

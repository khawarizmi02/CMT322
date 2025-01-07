'use client';
import React from 'react';
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
} from '@clerk/nextjs';

import { Toaster } from '@/components/ui/toaster';

import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { ScrollArea } from '@radix-ui/react-scroll-area';

import localFont from 'next/font/local';
import './globals.css';

import { metadata } from './metadata';
import { constructFromSymbol } from 'date-fns/constants';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <title>{String(metadata.title) ?? 'Default Title'}</title>
        </head>
        <body className="antialiased">
          <AuthContent>
            <main className="flex flex-col items-center">{children}</main>
          </AuthContent>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}

function AuthContent({ children }: { children: React.ReactNode }) {
  const { isSignedIn } = useAuth();
  return (
    <SidebarProvider>
      {isSignedIn ? <AppSidebar /> : null}
      <main className="w-full">
        <ScrollArea>{children}</ScrollArea>
      </main>
    </SidebarProvider>
  );
}

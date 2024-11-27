import type { Metadata } from 'next';

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { ScrollArea } from '@radix-ui/react-scroll-area';

export const metadata: Metadata = {
  title: 'SUKAD@USM',
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='w-full'>
        <SidebarTrigger />
        <ScrollArea className="h-[1000px]">{children}</ScrollArea>
      </main>
    </SidebarProvider>

    // <html lang="en">
    //   <body className={`antialiased`}>
    //     <main className="flex flex-col items-center">{children}</main>
    //   </body>
    // </html>
  );
}

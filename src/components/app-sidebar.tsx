'use client';
import { useState } from 'react';
import { Calendar, Home, Inbox, Search, Settings, List } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { title } from 'process';

// Menu items.
const items = [
  {
    title: 'Home',
    url: '/organizer',
    icon: Home,
  },
  {
    title: 'Sports',
    url: '/organizer/sports',
    icon: List,
  },
  // {
  //   title: 'Add Event',
  //   url: '/organizer/add-event',
  //   icon: Calendar,
  // },
  // {
  // 	title: 'Search',
  // 	url: '/organizer/search',
  // 	icon: Search,
  // },
  // {
  // 	title: 'Inbox',
  // 	url: '/organizer/inbox',
  // 	icon: Inbox,
  // },
  {
    title: 'Settings',
    url: '#',
    icon: Settings,
  },
];

export function AppSidebar() {
  const [open, setOpen] = useState(false);
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

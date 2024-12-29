'use client';

import React, { useState } from 'react';
import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import {
  Home,
  Newspaper,
  Trophy,
  UserPlus,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const menuItems = [
  {
    title: 'Home',
    url: '/organizer',
    icon: Home,
  },
  {
    title: 'Sports',
    url: '/organizer/sports',
    icon: Trophy,
  },
  {
    title: 'News',
    url: '/organizer/news',
    icon: Newspaper,
  },
  {
    title: 'Registration',
    url: '/organizer/registration',
    icon: UserPlus,
  },
];

export const AppSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const { user } = useUser();

  const handleLogout = () => {
    console.log('Logging out');
    setIsLogoutDialogOpen(false);
  };

  return (
    <>
      {/* Mobile/Desktop Toggle Button - Now hidden when sidebar is open */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          fixed z-50 top-4 left-4 
          text-primary-foreground 
          rounded-md transition-all
					flex items-center justify-center
          ${isOpen ? 'hidden md:hidden' : 'block'}
          md:block
        `}
      >
        <Menu className="h-8 w-8 text-black" />
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full bg-white border-r-2
          transition-all duration-300 ease-in-out z-40
					border-solid
          ${isOpen ? 'w-64' : 'w-16'}
          md:translate-x-0 
          ${isOpen ? '-translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex items-center justify-around h-16">
          <h2 className={`text-xl font-bold ${!isOpen && 'hidden'}`}>
            SUKAD-USM
          </h2>
          {isOpen && (
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-accent p-1 rounded-md"
            >
              <X className="h-6 w-6" />
            </button>
          )}
        </div>

        {/* Sidebar Navigation */}

        <nav className="px-4">
          <div className="flex items-center justify-center p-3">
            <UserButton />
          </div>
          {isOpen && (
            <div className="flex items-center justify-center p-3">
              <span className="text-sm text-gray-600">
                {user?.emailAddresses[0].emailAddress}
              </span>
            </div>
          )}
          {menuItems.map((item) => (
            <Link
              key={item.title}
              href={item.url}
              className={`
                flex items-center p-3 hover:bg-accent rounded-md 
                transition-all group
                ${!isOpen ? 'justify-center' : ''}
              `}
            >
              <item.icon className="h-6 w-6 flex-shrink-0" />
              <span
                className={`
                  ${!isOpen ? 'hidden' : 'block'} ml-3
                `}
              >
                {item.title}
              </span>
            </Link>
          ))}

          <button
            onClick={() => setIsLogoutDialogOpen(true)}
            className={`
              flex items-center p-3 hover:bg-accent rounded-md 
              transition-all group w-full
              ${!isOpen ? 'justify-center' : ''}
            `}
          >
            <Settings className="h-6 w-6 flex-shrink-0" />
            <span
              className={`
                ${!isOpen ? 'hidden' : 'block'} ml-3
              `}
            >
              Settings
            </span>
          </button>
        </nav>
      </div>

      {/* Content Wrapper */}
      <div
        className={`
          transition-all duration-300 ease-in-out
          ${isOpen ? 'md:pl-64 pl-0' : 'md:pl-16 pl-0'}
          pt-16
        `}
      >
        {/* Your page content will go here */}
      </div>

      {/* Logout Confirmation Dialog */}
      <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Log Out</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out of the application?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleLogout}>
              <LogOut className="mr-2 h-6 w-6" /> Log Out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AppSidebar;

'use client';
import React from 'react';
import { Inter } from 'next/font/google';
import {
  FaMapMarkerAlt,
  FaBookmark,
  FaBell,
  FaPlay,
  FaArrowRight,
} from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

import { SignInButton, useAuth } from '@clerk/nextjs';

import { signIntoFirebaseWithClerk } from '@/lib/firebase/auth';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { NewsDetails } from '@/data/mock-news';
import { SportsListDetails } from '@/data/mock-sportslist';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import LeaderboardDesasiswa from '@/components/LeaderboardDesasiswa';
import AnnouncementList from '@/app/AnnouncementList';
import SportList from './SportList';
import NewsList from './NewsList';

const inter = Inter({ subsets: ['latin'] });

const Home: React.FC = () => {
  const { isSignedIn, getToken } = useAuth();

  useEffect(() => {
    const signIn = async () => {
      if (isSignedIn) {
        const token = await getToken({ template: 'integration_firebase' });
        await signIntoFirebaseWithClerk(token || '');
      }
    };
    signIn();
  }, [isSignedIn, getToken]);

  return (
    <div className={`${inter.className} max-w-[90%]`}>
      {!isSignedIn ? (
        <div className="col-span-full flex justify-end p-4">
          <SignInButton>
            <button className="bg-[#654321] hover:bg-[#8B5E3C] text-white px-6 py-2 rounded-md transition-colors duration-200 flex items-center gap-2 font-medium">
              Sign In
            </button>
          </SignInButton>
        </div>
      ) : null}
      {/* Announcement */}
      <AnnouncementList />

      <Link
        title="News"
        className="text-[#654321] flex flex-row gap-2 w-[160px]"
        href="/news"
      >
        <h1 className="text-xl font-medium">News!</h1>
        <div className="pt-1.5">
          <FaArrowRight />
        </div>
      </Link>
      <div className="bg-gray-100 px-4 py-4 my-3">
        <NewsList />
      </div>

      {/* Leaderboard */}
      <div className="bg-gray-100 px-4 pt-4">
        <button
          title="Leaderboard"
          className="text-[#654321] flex flex-row gap-2 w-[160px]"
        >
          <h1 className="text-xl font-medium">Leaderboard!</h1>
          <div className="pt-1.5">
            <FaArrowRight />
          </div>
        </button>
      </div>
      <div className="flex bg-gray-100 p-4">
        <LeaderboardDesasiswa />
      </div>

      {/* Sports List */}
      <div className="bg-gray-100 px-4 pt-4">
        <button
          title="SportsList"
          className="text-[#654321] flex flex-row gap-2 w-[160px]"
        >
          <h1 className="text-xl font-medium">Sports List!</h1>
          <div className="pt-1.5">
            <FaArrowRight />
          </div>
        </button>
      </div>
      <div className="flex bg-gray-100 p-4 pb-10">
        <ScrollArea className="w-full whitespace-nowrap rounded-md">
          <div className="flex gap-4">
            {SportsListDetails.map((sports, index) => (
              <div key={sports.id} className="w-[200px] h-[250px]">
                <Card className="w-full h-full flex flex-col">
                  <CardHeader className="p-2 space-y-2 flex-shrink-0">
                    <CardTitle className="text-lg">{sports.title}</CardTitle>
                    <CardDescription className="text-sm line-clamp-2">
                      {' '}
                      {/* Added line-clamp-2 */}
                      {sports.category}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-2 flex-grow flex items-center justify-center">
                    <div className="relative w-full h-full">
                      <Image
                        src={`${sports.image}`}
                        alt="Football"
                        layout="fill"
                        objectFit="contain"
                        className="rounded-md"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {/* Footer */}
      <footer className="bg-transparent py-8 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-start">
          {/* Left section with three columns */}
          <div className="flex gap-20">
            {/* Matches Column */}
            <div className="flex flex-col">
              <h3 className="font-semibold text-lg mb-4">Matches</h3>
              <ul className="space-y-2">
                <li key={1}>
                  <Link
                    href="/current-matches"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Current Matches
                  </Link>
                </li>
                <li key={2}>
                  <Link
                    href="/leaderboard"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Leaderboard
                  </Link>
                </li>
                <li key={3}>
                  <Link
                    href="/schedule"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Match Schedule
                  </Link>
                </li>
                <li key={4}>
                  <Link
                    href="/history"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Match History
                  </Link>
                </li>
              </ul>
            </div>

            {/* Join Us Column */}
            <div className="flex flex-col">
              <h3 className="font-semibold text-lg mb-4">Join Us</h3>
              <ul className="space-y-2">
                <li key={1}>
                  <Link
                    href="/register"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Register Now
                  </Link>
                </li>
                <li key={2}>
                  <Link
                    href="/news"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    News
                  </Link>
                </li>
                <li key={3}>
                  <Link
                    href="/sukad-history"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    SUKAD History
                  </Link>
                </li>
                <li key={4}>
                  <Link
                    href="/volunteer"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Volunteer as Helpers
                  </Link>
                </li>
              </ul>
            </div>

            {/* About Us Column */}
            <div className="flex flex-col">
              <h3 className="font-semibold text-lg mb-4">About Us</h3>
              <ul className="space-y-2">
                <li key={1}>
                  <Link
                    href="/support"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Support
                  </Link>
                </li>
                <li key={2}>
                  <Link
                    href="/developers"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Developers
                  </Link>
                </li>
                <li key={3}>
                  <Link
                    href="/contact"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Logo on the right */}
          <div className="flex items-start">
            <div className="relative w-[350px] h-[140px]">
              <Image
                src="/images/USM_logo.png" // Replace with your logo path
                alt="App Logo"
                layout="fill"
                objectFit="contain"
                className="rounded-md"
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

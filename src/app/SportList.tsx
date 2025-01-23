'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Trophy, FlagTriangleLeft } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { sportCategory } from '@/data/type';
import LoadingComponent from '@/components/LoadingComponent';

const SportsList = () => {
  const router = useRouter();
  const [sportCategories, setSportCategories] = useState<sportCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await fetch('/api/sport-page', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch sports data');
        }

        const data = await response.json();
        setSportCategories(data.sportCategory);
        setLoading(false);
      } catch (error) {
        console.error('Error reading sports:', error);
        setLoading(false);
      }
    };

    fetchSports();
  }, []);

  if (loading) {
    return <LoadingComponent dataName="sports" />;
  }

  return (
    <ScrollArea className="w-full overflow-x-auto whitespace-nowrap rounded-md">
      <div className="flex w-max space-x-4 p-4">
        {sportCategories.map((sport, index) => (
          <Card
            key={index}
            className="rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 bg-white w-64"
          >
            <CardHeader className="p-0 relative">
              {sport.imageUrl ? (
                <img
                  src={sport.imageUrl}
                  alt={sport.sportCategoryName}
                  className="w-full h-32 object-cover"
                />
              ) : (
                <div className="w-full h-32 flex items-center justify-center bg-gray-100">
                  <FlagTriangleLeft size={48} className="text-gray-500" />
                </div>
              )}
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-lg font-semibold mb-2 truncate">
                {sport.sportCategoryName}
              </CardTitle>
              <CardDescription className="text-sm text-gray-600 truncate">
                {sport.sportName || 'Sport Category'}
              </CardDescription>
            </CardContent>
            <CardFooter className="p-4 flex justify-end">
              <Button
                onClick={() => router.push(`/sports/matches?sportCategoryID=${sport.sportCategoryID}`)}
                className="text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm"
              >
                <Trophy size={16} />
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default SportsList;
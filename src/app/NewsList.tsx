'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
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

import { FaPlay } from 'react-icons/fa';

import { news } from '@/data/type';
import { NewsDetails } from '@/data/mock-news';
import LoadingComponent from '@/components/LoadingComponent';
import PreRenderContent from '@/components/PreRenderContent';

const NewsList = () => {
  const router = useRouter();
  const [newsArticles, setNewsArticles] = useState<news[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        console.log(data.newsList);
        setNewsArticles(data.newsList);
      } catch (error) {
        console.error('Error reading news:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) {
    return <LoadingComponent dataName="news" />;
  }

  return (
    <ScrollArea className="w-full overflow-x-auto whitespace-nowrap rounded-md">
      <div className="flex w-max space-x-4 p-4">
        {newsArticles
          .filter((article) => article.type === 'news')
          .map((article, index) => (
            <Card
              key={index}
              className="rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 bg-white w-80"
            >
              <CardHeader className="p-0 relative">
                <img
                  src={
                    article.imageUrl
                      ? article.imageUrl
                      : 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80'
                  }
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg font-semibold mb-2 truncate">
                  {article.title}
                </CardTitle>
                <CardDescription className="text-sm text-gray-600 line-clamp-2 truncate">
                  <PreRenderContent content={article.content} />
                </CardDescription>
              </CardContent>
              <CardFooter className="p-4 flex justify-end">
                <Button
                  onClick={() => router.push(`/news/${article.newsID}`)}
                  className="text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm"
                >
                  <FaPlay />
                  Read More
                </Button>
              </CardFooter>
            </Card>
          ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default NewsList;

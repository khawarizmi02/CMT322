'use client';
import React, { useState, useEffect, use } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChevronRight, Calendar, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from '@/components/ui/dialog';
import PreRenderContent from '@/components/PreRenderContent';
import LoadingComponent from '@/components/LoadingComponent';
import { Loader } from 'lucide-react';

import { news } from '@/data/type';

const NewsList = () => {
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

  const handleDate = (date: string) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  if (loading) {
    return <LoadingComponent dataName="news" />;
  }

  return (
    <div className="grid md:grid-cols-3 gap-14">
      {newsArticles
        .filter((article) => article.type === 'news') // Filter articles by type
        .map((article, index) => (
          <Card
            key={index}
            className="rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 bg-white"
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
            <CardContent className="p-2">
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                {handleDate(article.date)}
              </div>

              <CardTitle className="mb-3">{article.title}</CardTitle>

              <PreRenderContent content={article.content} />

              <div className="flex space-x-2 mb-4">
                {article.tags?.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="w-full" asChild>
                <a href={`/news/${article.newsID}`}>
                  Read More <ChevronRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
    </div>
  );
};

export default NewsList;

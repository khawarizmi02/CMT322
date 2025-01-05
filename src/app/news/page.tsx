'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
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
import { newsArticles } from '@/data/mock-news';

const NewsPage = () => {
  const router = useRouter();
	const { isSignedIn } = useAuth();

  const handleCreateNews = () => {
    router.push('/news/create');
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">SUKAD NEWS</h1>
				{isSignedIn && (
					<Button
						className="flex items-center"
						onClick={handleCreateNews}
					>
						<Plus className="w-6 h-6 mr-2" />
						Create News
					</Button>
				)}
      </div>

      <div className="grid md:grid-cols-3 gap-14">
        {newsArticles.map((article) => (
          <Card
            key={article.id}
            className="rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 bg-white"
          >
            <CardHeader className="p-0 relative">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
            </CardHeader>
            <CardContent className="p-2">
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                {article.date}
              </div>

              <CardTitle className="mb-3">{article.title}</CardTitle>

              <p className="text-muted-foreground mb-4 truncate">
                {article.description}
              </p>

              <div className="flex space-x-2 mb-4">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="w-full" asChild>
                <a href={`/news/${article.id}`}>
                  Read More <ChevronRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;
'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { Loader, Calendar, Edit } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import LoadinComponent from '@/components/LoadingComponent';
import { useToast } from '@/hooks/use-toast';
import { news } from '@/data/type';
import Tiptap from '@/components/Tiptap';
import { set } from 'date-fns';

const Page = () => {
  const { toast } = useToast();
  const { isSignedIn } = useUser();
  const router = useRouter();
  const { newsID } = useParams();
  const [newsArticle, setNewsArticle] = useState<news>({
    newsID: '',
    title: '',
    content: '',
    date: '',
    imageUrl: '',
    type: 'news',
    tags: [],
  });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (newsID) {
      const fetchNewsDetails = async () => {
        try {
          const response = await fetch(`/api/news/${newsID}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json();
          setNewsArticle(data.newsList);
        } catch (error) {
          console.error('Error fetching news details:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchNewsDetails();
    }
  }, [newsID]);

  const handleDate = (date: string) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  const handleEdit = () => {
    setIsEditing(true);
    // You can implement the edit functionality here
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/news/${newsID}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newsArticle),
      });
      const data = await response.json();
      setIsEditing(false);
      await router.refresh();
      toast({
        title: 'Success',
        description: 'News has been updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update news. Please try again.',
        variant: 'destructive',
      });
      console.error('Error updating news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await fetch(`/api/news/${newsID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // Redirect or update state after deletion
      toast({
        title: 'Success',
        description: 'News has been deleted successfully',
      });
      router.push('/news');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete news. Please try again.',
        variant: 'destructive',
      });
      console.error('Error deleting news article:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadinComponent dataName="news" />;
  }

  if (!newsArticle) {
    return <div>News article not found</div>;
  }

  if (isEditing) {
    return (
      <div className="container max-w-4xl mx-auto p-6">
        <Card className="border-none shadow-none">
          <CardHeader className="space-y-4">
            <div className="relative w-full h-96 rounded-lg overflow-hidden">
              <img
                src={newsArticle.imageUrl}
                alt={newsArticle.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-2" />
                  {handleDate(newsArticle.date)}
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleSave}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    Save
                  </Button>
                  <Button
                    onClick={handleDelete}
                    variant="destructive"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    Delete
                  </Button>
                </div>
              </div>
              <input
                type="text"
                value={newsArticle.title}
                onChange={(e) =>
                  setNewsArticle({ ...newsArticle, title: e.target.value })
                }
                className="text-4xl font-bold tracking-tight w-full"
              />
              <div className="flex flex-wrap gap-2">
                {newsArticle.tags?.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardHeader>
          <Separator className="my-6" />
          <CardContent className="prose prose-lg max-w-none">
            <Tiptap
              description={newsArticle.content}
              onChange={(value) =>
                setNewsArticle({ ...newsArticle, content: value })
              }
            />
          </CardContent>
          <CardFooter className="mt-8">
            <p className="text-sm text-muted-foreground">
              Last updated: {handleDate(newsArticle.date)}
            </p>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto p-6">
      <Card className="border-none shadow-none">
        <CardHeader className="space-y-4">
          <div className="relative w-full h-96 rounded-lg overflow-hidden">
            <img
              src={newsArticle.imageUrl}
              alt={newsArticle.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 mr-2" />
                {handleDate(newsArticle.date)}
              </div>
              {isSignedIn && (
                <Button
                  onClick={handleEdit}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit Article
                </Button>
              )}
            </div>
            <h1 className="text-4xl font-bold tracking-tight">
              {newsArticle.title}
            </h1>
            <div className="flex flex-wrap gap-2">
              {newsArticle.tags?.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardHeader>
        <Separator className="my-6" />
        <CardContent className="prose prose-lg max-w-none">
          <div
            className="text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: newsArticle.content }}
          />
        </CardContent>
        <CardFooter className="mt-8">
          <p className="text-sm text-muted-foreground">
            Last updated:{' '}
            {handleDate(
              newsArticle.lastUpdated
                ? newsArticle.lastUpdated
                : newsArticle.date
            )}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;

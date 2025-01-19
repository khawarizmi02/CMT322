'use client';
import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LoadingComponent from '@/components/LoadingComponent';
import PreRenderContent from '@/components/PreRenderContent';
import { news } from '@/data/type';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';

const AnnouncementList = () => {
  const [announcementList, setAnnouncementList] = useState<news[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<news | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch('/api/news/announcement', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setAnnouncementList(data.announcementList);
      } catch (error) {
        console.error('Error reading news:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  const handleDate = (date: string) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  const handleDialogOpen = (announcement: news) => {
    setSelectedAnnouncement(announcement);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setSelectedAnnouncement(null);
    setIsDialogOpen(false);
  };

  if (loading) {
    return <LoadingComponent dataName="announcement" />;
  }

  return (
    <div className="container p-6 max-w-[90%]">
      <div className="mb-8 flex items-center space-x-2">
        <AlertCircle className="h-8 w-8 text-red-500" />
        <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
      </div>

      <Carousel>
        <CarouselContent>
          {announcementList.map((announcement) => (
            <CarouselItem key={announcement.newsID}>
              <div className="p-1">
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="bg-gray-50">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl font-semibold text-gray-900">
                        {announcement.title}
                      </CardTitle>
                      <span className="text-sm text-gray-500 font-medium">
                        {handleDate(announcement.date)}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="mt-4">
                    <PreRenderContent content={announcement.content} />
                    <button
                      className="mt-4 text-blue-500 hover:underline"
                      onClick={() => handleDialogOpen(announcement)}
                    >
                      Read More
                    </button>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {announcementList.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No announcements available</p>
        </div>
      )}

      {selectedAnnouncement && (
        <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
          <DialogContent className="max-w-lg p-6 bg-white rounded-lg shadow-lg">
            <DialogTitle className="text-2xl font-bold text-gray-900 mb-4">
              {selectedAnnouncement.title}
            </DialogTitle>
            <div className="text-lg text-gray-500 mb-4">
              {handleDate(selectedAnnouncement.date)}
            </div>
            <div className="prose max-w-none text-gray-700 text-lg">
              <div
                dangerouslySetInnerHTML={{
                  __html: selectedAnnouncement.content,
                }}
              />
            </div>
            <button
              className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleDialogClose}
            >
              Close
            </button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AnnouncementList;

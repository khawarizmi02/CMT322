'use client';
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { ChevronRight, Calendar, Plus, ImagePlus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { newsArticles } from '@/data/mock-news';

const UploadNewsPage = () => {
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    null
  );

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    const file = files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">SUKAD NEWS</h1>
        <div className="max-h-">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 bg-primary text-white hover:bg-primary/90">
                <Plus className="h-4 w-4" />
                Upload News
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[700px] max-h-[700px] overflow-hidden overflow-y-auto bg-white rounded-lg shadow-xl">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-gray-800">
                  Upload News Article
                </DialogTitle>
                <CardDescription className="text-sm text-gray-500">
                  Provide the necessary details to create a new news article.
                </CardDescription>
              </DialogHeader>

              <div className="grid gap-6 py-6 px-2 sm:px-4">
                {/* Image Upload Section */}
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label
                    htmlFor="image"
                    className="text-sm font-medium text-right"
                  >
                    Image
                  </Label>
                  <div className="col-span-3 relative group">
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <label
                      htmlFor="image"
                      className="flex items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition group-hover:border-primary"
                    >
                      {imagePreview ? (
                        <img
                          src={
                            typeof imagePreview === 'string'
                              ? imagePreview
                              : undefined
                          }
                          alt="Preview"
                          className="max-h-full max-w-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="text-center">
                          <ImagePlus className="mx-auto mb-2 h-10 w-10 text-gray-400 group-hover:text-primary" />
                          <p className="text-sm text-gray-500 group-hover:text-gray-700">
                            Click to upload image
                          </p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* Title Input */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="title"
                    className="text-sm font-medium text-right"
                  >
                    Title
                  </Label>
                  <Input
                    id="title"
                    placeholder="Enter news title"
                    className="col-span-3"
                  />
                </div>

                {/* Date Input */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="date"
                    className="text-sm font-medium text-right"
                  >
                    Date
                  </Label>
                  <Input id="date" type="date" className="col-span-3" />
                </div>

                {/* Category Select */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="category"
                    className="text-sm font-medium text-right"
                  >
                    Category
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Badminton">Badminton</SelectItem>
                      <SelectItem value="Voleyball">Voleyball</SelectItem>
                      <SelectItem value="Netball">Netball</SelectItem>
                      <SelectItem value="Football">Football</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Description Textarea */}
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label
                    htmlFor="description"
                    className="text-sm font-medium text-right"
                  >
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Enter news description"
                    className="col-span-3 min-h-[100px] rounded-md"
                  />
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex justify-end gap-3 mt-4">
                <Button variant="outline" className="hover:bg-gray-50">
                  Cancel
                </Button>
                <Button className="bg-primary text-white hover:bg-primary/90">
                  Upload News
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
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

export default UploadNewsPage;

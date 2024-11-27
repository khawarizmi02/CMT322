'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { UploadCloud, Tags, FileText, Link } from 'lucide-react';

// Zod validation schema
const newsSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  description: z.string().min(20, { message: "Description must be at least 20 characters" }),
  category: z.string(),
  tags: z.string().optional(),
  imageUrl: z.string().url({ message: "Please enter a valid URL" }).optional(),
});

const CreateNewsPage = () => {
  const router = useRouter();
  
  // Categories for news
  const categories = [
    'Technology', 
    'Business', 
    'Education', 
    'Events', 
    'Announcements', 
    'Other'
  ];

  // Initialize form with zod resolver
  const form = useForm<z.infer<typeof newsSchema>>({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      tags: '',
      imageUrl: '',
    }
  });

  // Form submission handler
  const onSubmit = async (values: z.infer<typeof newsSchema>) => {
    try {
      // Prepare the news article data
      const newsData = {
        ...values,
        // You would typically send this to your backend API
        date: new Date().toISOString(),
        tags: values.tags ? values.tags.split(',').map(tag => tag.trim()) : []
      };

      // TODO: Replace with actual API call
      console.log('News Article Submitted:', newsData);

      // Redirect to news page after successful submission
      router.push('/news');
    } catch (error) {
      console.error('Submission error:', error);
      // Handle error (e.g., show error toast)
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <FileText className="w-8 h-8" />
            Create News Article
          </CardTitle>
        </CardHeader>
        <CardContent className="px-12 py-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Title Field */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Title</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter news article title" 
                        className="text-base py-2 h-12"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description Field */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Write a detailed description of the news article" 
                        className="min-h-[200px] text-base"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-6">
                {/* Category Field */}
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Category</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Tags Field */}
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg flex items-center gap-2">
                        <Tags className="w-5 h-5" /> Tags
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter tags (comma-separated)" 
                          className="text-base py-2 h-12"
                          {...field} 
                        />
                      </FormControl>
                      <small className="text-muted-foreground">
                        Separate multiple tags with commas
                      </small>
                    </FormItem>
                  )}
                />
              </div>

              {/* Image URL Field */}
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg flex items-center gap-2">
                      <UploadCloud className="w-5 h-5" /> Image URL
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Optional: Paste image URL" 
                        className="text-base py-2 h-12"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Action Buttons */}
              <div className="flex justify-between space-x-4 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="text-base py-2 px-6"
                  onClick={() => router.push('/news')}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="text-base py-2 px-6"
                >
                  Create News Article
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateNewsPage;
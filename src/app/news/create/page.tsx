'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

// Zod validation schema
const infoSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters' }),
  content: z
    .string()
    .min(20, { message: 'Content must be at least 20 characters' }),
  type: z.string(),
  imageUrl: z
    .string()
    .optional()
    .superRefine((value, context) => {
      const type = context.path.includes('type')
        ? context.path[context.path.indexOf('type') + 1]
        : undefined;
      if (type === 'news' && !value) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Image URL is required for news type',
        });
      }
      if (value && !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(value)) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Please enter a valid URL',
        });
      }
    }),
});

type FormData = z.infer<typeof infoSchema>;

const CreateNewsPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form with zod resolver
  const form = useForm<FormData>({
    resolver: zodResolver(infoSchema),
    defaultValues: {
      title: '',
      content: '',
      type: '',
      imageUrl: '',
    },
  });

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    try {
      const response = await fetch('/api/create-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create info');
      }

      toast({
        title: 'Success',
        description: 'Info has been created successfully',
      });

      router.refresh();
      form.reset();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create info. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>Create Info</CardTitle>
        <CardDescription>
          Create a new info article with specified type and content.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Title Field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Content Field */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter content"
                      className="min-h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Type Dropdown */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="news">News</SelectItem>
                      <SelectItem value="announcement">Announcement</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch('type') === 'news' && (
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>News Image URL (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter image URL (optional)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Create Info
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateNewsPage;

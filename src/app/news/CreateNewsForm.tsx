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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { storage } from '@/firebase/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Tiptap from '@/components/Tiptap';

// Zod validation schema
const infoSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters' }),
  content: z
    .string()
    .min(1, { message: 'Hey the title is not long Enough' })
    .max(99999, { message: 'Hey the title is too long' })
    .trim(),
  type: z.string(),
  imageUrl: z
    .any()
    .optional()
    .superRefine((value, context) => {
      const type = value.type;
      if (type === 'news' && (!value || value.length === 0)) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Image is required for news type',
        });
      }
    }),
  tags: z.array(z.string()).optional(),
});

type FormData = z.infer<typeof infoSchema>;

const CreateNewsForm = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Initialize form with zod resolver
  const form = useForm<FormData>({
    resolver: zodResolver(infoSchema),
    defaultValues: {
      title: '',
      content: '',
      type: 'news',
      imageUrl: '',
      tags: [],
    },
  });

  function addTag(tag: string) {
    setTags([...tags, tag]);
  }

  function handleAddTag() {
    if (tagInput && !tags.includes(tagInput)) {
      addTag(tagInput);
      setTagInput('');
    }
  }

  function removeTag(tag: string) {
    setTags(tags.filter((t) => t !== tag));
  }

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('data', JSON.stringify({ ...data, tags }));
      if (data.imageUrl) {
        formData.append('image', data.imageUrl);
      }

      const response = await fetch('/api/news', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to create news');
      }

      toast({
        title: 'Success',
        description: 'News has been created successfully',
      });

      router.refresh();
      form.reset();
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create news. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue('imageUrl', file);
    }
  }

  return (
    <Card className="w-full mx-auto space-y-6">
      <CardContent className="mt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Type Dropdown */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }: { field: any }) => (
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
                    <Tiptap onChange={field.onChange} description={''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch('type') === 'news' && (
              <>
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>News Image (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </FormControl>
                      {imagePreview && (
                        <img
                          src={imagePreview}
                          alt="Image Preview"
                          className="mt-2 max-h-64"
                        />
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Tags Field */}
                <div>
                  <Label>Tags</Label>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter tag"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="default"
                      onClick={handleAddTag}
                    >
                      Add Tag
                    </Button>
                  </div>
                  <FormDescription>Click the tag to remove</FormDescription>
                  <div className="mt-2 space-x-2">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-block bg-gray-200 px-2 py-1 rounded cursor-pointer"
                        onClick={() => removeTag(tag)}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Info'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateNewsForm;

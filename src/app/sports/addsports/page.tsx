'use client';
import React from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { CirclePlus, Volleyball } from 'lucide-react';

const AddSportSchema = z.object({
  sportsName: z.string().nonempty('Sport name is required'),
  sportsDesc: z.string().nonempty('Sport description is required'),
});

const CreateSportForm: React.FC = () => {
  const methods = useForm<z.infer<typeof AddSportSchema>>({
    resolver: zodResolver(AddSportSchema),
    defaultValues: {
      sportsName: '',
      sportsDesc: '',
    },
  });

  // Handle form submission
  const onSubmit = (data: z.infer<typeof AddSportSchema>) => {
    console.log('Sports:', data);
    // Add your submission logic here
  };

  return (
    <div className="bg-gradient-to-b from-background to-secondary/10">
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="flex items-center gap-4 mb-8">
          <Volleyball className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Create New Sport</h1>
            <p className="text-muted-foreground mt-1">Create a new sport that will be contested in the tournament</p>
          </div>
        </div>

        {/* </div></div><div className="container mx-auto py-8 px-6"> */}
        <Card className="bg-white border-2 min-w-[680px] py-2 px-2">
          {/* <CardHeader>
            <CardTitle className="text-3xl">CREATE SPORT</CardTitle>
          </CardHeader> */}
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <CirclePlus className="h-6 w-6" />
              Sport Details
            </CardTitle>
            <CardDescription>
            Provide the details below to add a new sport for the SUKAD tournament
            </CardDescription>
          </CardHeader>

          <CardContent>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  name="sportsName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sport Name</FormLabel>
                      <Input {...field} placeholder="Enter sport name" />
                      <FormMessage>{methods.formState.errors.sportsName?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  name="sportsDesc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sport Description</FormLabel>
                      <textarea
                        {...field}
                        placeholder="Enter sport description"
                        className="block w-full rounded-md border py-2 px-3 focus:outline-none resize-y overflow-auto h-60"
                      />
                      <FormMessage>{methods.formState.errors.sportsDesc?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">Create Sport</Button>
              </form>
            </FormProvider>
          </CardContent>
        </Card>
      </div>
    </div>
  
  );
};

export default CreateSportForm;
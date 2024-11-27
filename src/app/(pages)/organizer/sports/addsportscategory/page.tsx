'use client';
import React from 'react';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { CirclePlus, Users, Volleyball } from 'lucide-react';

// Test only
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SportsListDetailsCopy } from '@/data/mock-sportslist-copy';

// Zod schema for form validation
const registrantSchema = z.object({
    registrants: z.array(
      z.object({
        sport: z.string().nonempty("Event is required"),
        desasiswa: z.string().nonempty("Desasiswa is required"),
        name: z.string().nonempty("Name is required"),
        matricNumber: z.string().nonempty("Matric Number is required"),
        school: z.string().nonempty("School is required"),
      })
    )
  });





const AddSportCategorySchema = z.object({
  sportsCategoryName: z.string().nonempty('Sport category name is required'),
  sportsCategoryDesc: z.string().nonempty('Sport category description is required'),
});

const CreateSportCategoryForm: React.FC = () => {
  const methods = useForm<z.infer<typeof AddSportCategorySchema>>({
    resolver: zodResolver(AddSportCategorySchema),
    defaultValues: {
        sportsCategoryName: '',
        sportsCategoryDesc: '',
    },
  });

  // Handle form submission
  const onSubmit = (data: z.infer<typeof AddSportCategorySchema>) => {
    console.log('Sports Category:', data);
    // Add your submission logic here
  };





    // Initialize form with react-hook-form and zod
    const form = useForm<z.infer<typeof registrantSchema>>({
        resolver: zodResolver(registrantSchema),
        defaultValues: {
          registrants: [
            { sport: '', desasiswa: '', name: '', matricNumber: '', school: '' }
          ]
        }
      });
    
      // Use field array to manage dynamic form fields
      const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "registrants",
      });
    
      // Handle form submission
      const onSSubmit = (data: z.infer<typeof registrantSchema>) => {
        console.log('Registrants:', data.registrants);
        // Add your submission logic here
      };




      

  return (
    <div className="bg-transparent from-background to-secondary/10">
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="flex items-center gap-4 mb-8">
          <Volleyball className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Add Sport Category</h1>
            <p className="text-muted-foreground mt-1">Add new categories based on the selected sports</p>
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
              Sport Category Details
            </CardTitle>
            <CardDescription>
            Provide the details below to add a new sport category
            </CardDescription>
          </CardHeader>

          <CardContent>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  name="sportsCategoryName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sport Category Name</FormLabel>
                      <Input {...field} placeholder="Enter sport category name" />
                      <FormMessage>{methods.formState.errors.sportsCategoryName?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  name="sportsCategoryDesc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sport Category Description</FormLabel>
                      <textarea
                        {...field}
                        placeholder="Enter sport category description"
                        className="block w-full rounded-md border py-2 px-3 focus:outline-none resize-y overflow-auto h-60"
                      />
                      <FormMessage>{methods.formState.errors.sportsCategoryDesc?.message}</FormMessage>
                    </FormItem>
                  )}
                />





                <div className="container mx-auto py-4">
                    <Card className='bg-transparent'>
                    <CardHeader>
                        <CardTitle className="text-2xl flex items-center gap-2">
                        <Users className="h-6 w-6" />
                        Add Team
                        </CardTitle>
                        <CardDescription>
                        Provide the details about the teams who participate in this sport category
                        </CardDescription>
                    </CardHeader>
                        <CardContent>
                        <form onSubmit={form.handleSubmit(onSSubmit)} className="space-y-4">

                        <div className="grid grid-cols-2 gap-4"> 
                        <FormField
                        name="team"
                        render={({ field: inputField }) => (
                            <FormItem>
                            <FormLabel>Team</FormLabel>
                            <Select 
                                onValueChange={inputField.onChange} 
                                defaultValue="Team Titans"
                            >
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a team" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                <SelectItem value="Team Titans">Team Titans</SelectItem>
                                <SelectItem value="netball">Netball</SelectItem>
                                <SelectItem value="badminton">Badminton</SelectItem>
                                <SelectItem value="futsal">Futsal</SelectItem>
                                <SelectItem value="volleyball">Volleyball</SelectItem>
                                <SelectItem value="petanque">Petanque</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                        />

                        <FormField
                        name="desasiswa"
                        render={({ field: inputField }) => (
                            <FormItem>
                            <FormLabel>Desasiswa</FormLabel>
                            <Select 
                                onValueChange={inputField.onChange} 
                                defaultValue="Desasiswa Tekun"
                            >
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a desasiswa" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                <SelectItem value="Desasiswa Tekun">Desasiswa Tekun</SelectItem>
                                <SelectItem value="Desasiswa Restu">Desasiswa Restu</SelectItem>
                                <SelectItem value="Desasiswa Saujana">Desasiswa Saujana</SelectItem>
                                <SelectItem value="Desasiswa Indah Kembara">Desasiswa Indah Kembara</SelectItem>
                                <SelectItem value="Desasiswa Aman Damai">Desasiswa Aman Damai</SelectItem>
                                <SelectItem value="Desasiswa Bakti Fajar Permai Petas">Desasiswa Bakti Fajar Permai Petas</SelectItem>
                                <SelectItem value="Desasiswa Cahaya Gemilang Harapan">Desasiswa Cahaya Gemilang Harapan</SelectItem>
                                <SelectItem value="Desasiswa Murni Nurani">Desasiswa Murni Nurani</SelectItem>
                                <SelectItem value="Desasiswa Jaya Lembaran Utama">Desasiswa Jaya Lembaran Utama</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        </div>
                            
                            
                            {fields.map((field, index) => (
                                <Card key={field.id} className="bg-white">
                                <CardHeader>
                                    <CardTitle className="text-xl">
                                    Participant {index + 1}
                                    </CardTitle>
                                </CardHeader>
                                
                                <CardContent className="grid grid-cols-2 gap-4">
                                    <FormField
                                    control={form.control}
                                    name={`registrants.${index}.name`}
                                    render={({ field: inputField }) => (
                                        <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input {...inputField} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                    />

                                    <FormField
                                    control={form.control}
                                    name={`registrants.${index}.matricNumber`}
                                    render={({ field: inputField }) => (
                                        <FormItem>
                                        <FormLabel>Matric Number</FormLabel>
                                        <FormControl>
                                            <Input {...inputField} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                    />

                                    {fields.length > 1 && (
                                    <div className="col-span-2 mt-4">
                                        <Button 
                                        type="button" 
                                        variant="destructive" 
                                        onClick={() => remove(index)}
                                        >
                                        Remove Team Members
                                        </Button>
                                    </div>
                                    )}
                                </CardContent>
                                </Card>
                            ))}

                            <div className="flex space-x-4">
                                <Button 
                                type="button" 
                                onClick={() => append({ 
                                    sport: '', 
                                    desasiswa: '', 
                                    name: '', 
                                    matricNumber: '', 
                                    school: '' 
                                })}
                                >
                                Add Team Members
                                </Button>
                                <Button type="submit">Submit</Button>
                            </div>
                        </form>
                        </CardContent>
                    </Card>
                    </div>





                <Button type="submit" className="w-full">Create Sport Category</Button>
              </form>
            </FormProvider>
          </CardContent>
        </Card>
      </div>
    </div>
  
  );
};

export default CreateSportCategoryForm;
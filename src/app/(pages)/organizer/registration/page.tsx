'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { CirclePlus, User } from 'lucide-react';

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

const RegistrationPage: React.FC = () => {
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
  const onSubmit = (data: z.infer<typeof registrantSchema>) => {
    console.log('Registrants:', data.registrants);
    // Add your submission logic here
  };

  return (
    <div className="container mx-auto py-8 min-w-[680px]">
      <div className="flex items-center gap-4 mb-8">
          <User className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Register Participant</h1>
            <p className="text-muted-foreground mt-1">Register new participants for SUKAD tournament</p>
          </div>
        </div>
        
      <Card className='bg-white'>
      <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <CirclePlus className="h-6 w-6" />
              Registration Form
            </CardTitle>
            <CardDescription>
            Fill in the details below to register participants for the selected sports event
            </CardDescription>
          </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                      name={`registrants.${index}.sport`}
                      render={({ field: inputField }) => (
                        <FormItem>
                          <FormLabel>Event</FormLabel>
                          <Select 
                            onValueChange={inputField.onChange} 
                            defaultValue={inputField.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select an event" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="football">Football</SelectItem>
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
                      control={form.control}
                      name={`registrants.${index}.desasiswa`}
                      render={({ field: inputField }) => (
                        <FormItem>
                          <FormLabel>Desasiswa</FormLabel>
                          <Select 
                            onValueChange={inputField.onChange} 
                            defaultValue={inputField.value}
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
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

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

                    <FormField
                      control={form.control}
                      name={`registrants.${index}.school`}
                      render={({ field: inputField }) => (
                        <FormItem>
                          <FormLabel>School</FormLabel>
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
                          Remove Registrant
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
                  Add Registrant
                </Button>
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationPage;
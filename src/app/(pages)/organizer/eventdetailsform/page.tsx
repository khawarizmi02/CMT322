// 'use client';
// import React, { useState } from 'react';
// import { EventRulesDesc } from '@/data/mock-eventrules';
// import { Card, CardHeader, CardTitle, CardContent} from '@/components/ui/card';
// import { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator, SelectScrollUpButton, SelectScrollDownButton } from '@/components/ui/select';
// import { useFormField, Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField } from '@/components/ui/form';

// interface FormData {
//   event: string;
//   eventCategory: string;
//   rules: string;
// }

// const EventCategoryForm: React.FC = () => {
//   const [formData, setFormData] = useState<FormData>({
//     event: '',
//     eventCategory: '',
//     rules: '',
//   });

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));

//     // Update the rules value based on the selected event category
//     if (name === 'eventCategory') {
//       const selectedEvent = EventRulesDesc.find(
//         (event) => event.sportCategory === value
//       );
//       setFormData((prevData) => ({
//         ...prevData,
//         rules: selectedEvent?.description || '',
//       }));
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log('Form data:', formData);
//     // Add your form submission logic here
//   };

//   const distinctEvents = Array.from(new Set(EventRulesDesc.map(event => event.sport)));
//   const distinctEventCategories = Array.from(new Set(EventRulesDesc.map(event => event.sportCategory)));

//   return (
//     <div className="container mx-auto py-8">
//       <h1 className="text-3xl font-bold mb-4">Event Category</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="bg-gray-100 p-4 rounded-md mb-4 border border-gray-200">
//             <div className='pb-3'>
//                 <label htmlFor="event" className="block font-medium mb-2">
//                 Select an Event:
//                 </label>
//                 <select
//                 id="event"
//                 name="event"
//                 value={formData.event}
//                 onChange={handleInputChange}
//                 className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-primary"
//                 >
//                 <option value="">Select an event</option>
//                 {distinctEvents.map((event) => (
//                     <option key={event} value={event}>
//                         {event}
//                     </option>
//                     ))}
//                 </select>
//             </div>
//             <div className='py-3'>
//                 <label htmlFor="eventCategory" className="block font-medium mb-2">
//                 Select an Event Category:
//                 </label>
//                 <select
//                 id="eventCategory"
//                 name="eventCategory"
//                 value={formData.eventCategory}
//                 onChange={handleInputChange}
//                 className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-primary"
//                 >
//                 <option value="">Select an event category</option>
//                 {distinctEventCategories.map((eventCategory) => (
//                     <option key={eventCategory} value={eventCategory}>
//                         {eventCategory}
//                     </option>
//                     ))}
//                 </select>
//             </div>
//             <div className='py-3'>
//                 <label htmlFor="rules" className="block font-medium mb-2">
//                 Rules Explanation:
//                 </label>
//                 <textarea
//                 id="rules"
//                 name="rules"
//                 value={formData.rules}
//                 onChange={handleInputChange}
//                 className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 h-64 justify-start"
//                 readOnly
//                 />
//             </div>
            
//         </div>
//         <div className='py-1.5'>
//             <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md">
//                 Submit
//             </button>
//         </div>
//         </form>
//     </div>
//   );
// };

// export default EventCategoryForm;



'use client';

import React from 'react';
import { EventRulesDesc } from '@/data/mock-eventrules';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Button } from "@/components/ui/button";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import * as z from 'zod';

// Zod schema for form validation
const formSchema = z.object({
  event: z.string().min(1, { message: "Please select an event" }),
  eventCategory: z.string().min(1, { message: "Please select an event category" }),
  rules: z.string()
});

const EventCategoryForm: React.FC = () => {
  // Form hook with Zod validation
  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      event: '',
      eventCategory: '',
      rules: '',
    }
  });

  // Derive distinct events and categories
  const distinctEvents = Array.from(new Set(EventRulesDesc.map(event => event.sport)));
  const distinctEventCategories = Array.from(new Set(EventRulesDesc.map(event => event.sportCategory)));

  // Watch form values
  const selectedEvent = methods.watch('event');
  const selectedEventCategory = methods.watch('eventCategory');

  // Filter event categories based on selected event
  const filteredEventCategories = distinctEventCategories.filter(category => 
    EventRulesDesc.some(event => event.sport === selectedEvent && event.sportCategory === category)
  );

  // Handle form submission
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log('Form data:', data);
    // Add your submission logic here
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">REGISTER EVENT CATEGORY</h1>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Select an Event</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="event" className="text-sm font-medium">Event</label>
                  <Select 
                    onValueChange={(value) => {
                      methods.setValue('event', value);
                      methods.setValue('eventCategory', '');
                      methods.setValue('rules', '');
                    }} 
                    value={methods.watch('event')}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an event" />
                    </SelectTrigger>
                    <SelectContent>
                      {distinctEvents.map((event) => (
                        <SelectItem key={event} value={event}>
                          {event}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {methods.formState.errors.event && (
                    <p className="text-sm text-red-500">
                      {methods.formState.errors.event.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Select an Event Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="eventCategory" className="text-sm font-medium">Event Category</label>
                  <Select 
                    onValueChange={(value) => {
                      methods.setValue('eventCategory', value);
                      const selectedEventObj = EventRulesDesc.find(event => 
                        event.sport === selectedEvent && 
                        event.sportCategory === value
                      );
                      methods.setValue('rules', selectedEventObj?.description || '');
                    }} 
                    value={methods.watch('eventCategory')}
                    disabled={!selectedEvent}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an event category" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredEventCategories.map((eventCategory) => (
                        <SelectItem key={eventCategory} value={eventCategory}>
                          {eventCategory}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {methods.formState.errors.eventCategory && (
                    <p className="text-sm text-red-500">
                      {methods.formState.errors.eventCategory.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rules Explanation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="rules" className="text-sm font-medium">Rules</label>
                  <textarea
                    value={methods.watch('rules')}
                    className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 h-64 resize-none"
                    readOnly
                    placeholder="Rules will be displayed here"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-start">
            <Button 
              type="submit" 
            >
              Submit
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
    </div>
  );
};

export default EventCategoryForm;
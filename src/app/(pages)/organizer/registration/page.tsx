// 'use client';
// import React, { useState } from 'react';

// interface RegistrantData {
//   sport: string;
//   desasiswa: string;
//   name: string;
//   matricNumber: string;
//   school: string;
// }

// const RegistrationPage: React.FC = () => {
//   const [registrants, setRegistrants] = useState<RegistrantData[]>([
//     { sport: '', desasiswa: '', name: '', matricNumber: '', school: '' },
//   ]);

//   const handleAddRegistrant = () => {
//     setRegistrants([
//       ...registrants,
//       { sport: '', desasiswa: '', name: '', matricNumber: '', school: '' },
//     ]);
//   };

//   const handleRemoveRegistrant = (index: number) => {
//     const updatedRegistrants = [...registrants];
//     updatedRegistrants.splice(index, 1);
//     setRegistrants(updatedRegistrants);
//   };

//   const handleInputChange = (
//     index: number,
//     field: keyof RegistrantData,
//     value: string
//   ) => {
//     const updatedRegistrants = [...registrants];
//     updatedRegistrants[index][field] = value;
//     setRegistrants(updatedRegistrants);
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log('Registrants:', registrants);
//     // You can add the logic to submit the form data here
//   };

//   return (
//     <div className="container mx-auto py-8">
//       <h1 className="text-3xl font-bold mb-4">REGISTER PARTICIPANT</h1>
//       <form onSubmit={handleSubmit}>
//         {registrants.map((registrant, index) => (
//           <div
//             key={index}
//             className="bg-gray-100 p-4 rounded-md mb-4 border border-gray-200"
//           >
//             <h2 className="text-xl font-bold mb-2">Registrant {index + 1}</h2>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor={`sport-${index}`} className="block font-medium mb-2">
//                   Event
//                 </label>
//                 <select
//                   id={`sport-${index}`}
//                   value={registrant.sport}
//                   onChange={(e) =>
//                     handleInputChange(index, 'sport', e.target.value)
//                   }
//                   className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 >
//                   <option value="">Select an event</option>
//                   <option value="football">Football</option>
//                   <option value="netball">Netball</option>
//                   <option value="badminton">Badminton</option>
//                   <option value="futsal">Futsal</option>
//                   <option value="volleyball">Volleyball</option>
//                   <option value="petanque">Petanque</option>
//                 </select>
//               </div>
//               <div>
//                 <label htmlFor={`desasiswa-${index}`} className="block font-medium mb-2">
//                   Desasiswa
//                 </label>
//                 <select
//                   id={`desasiswa-${index}`}
//                   value={registrant.desasiswa}
//                   onChange={(e) =>
//                     handleInputChange(index, 'desasiswa', e.target.value)
//                   }
//                   className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 >
//                   <option value="">Select a desasiswa</option>
//                   <option value="Desasiswa Tekun">Desasiswa Tekun</option>
//                   <option value="Desasiswa Restu">Desasiswa Restu</option>
//                   <option value="Desasiswa Saujana">Desasiswa Saujana</option>
//                   <option value="Desasiswa Indah Kembara">Desasiswa Indah Kembara</option>
//                   <option value="Desasiswa Aman Damai">Desasiswa Aman Damai</option>
//                 </select>
//               </div>
//               <div>
//                 <label htmlFor={`name-${index}`} className="block font-medium mb-2">
//                   Name
//                 </label>
//                 <input
//                   id={`name-${index}`}
//                   type="text"
//                   value={registrant.name}
//                   onChange={(e) =>
//                     handleInputChange(index, 'name', e.target.value)
//                   }
//                   className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//               </div>
//               <div>
//                 <label htmlFor={`matricNumber-${index}`} className="block font-medium mb-2">
//                   Matric Number
//                 </label>
//                 <input
//                   id={`matricNumber-${index}`}
//                   type="text"
//                   value={registrant.matricNumber}
//                   onChange={(e) =>
//                     handleInputChange(index, 'matricNumber', e.target.value)
//                   }
//                   className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//               </div>
//               <div>
//                 <label htmlFor={`school-${index}`} className="block font-medium mb-2">
//                   School
//                 </label>
//                 <input
//                   id={`school-${index}`}
//                   type="text"
//                   value={registrant.school}
//                   onChange={(e) =>
//                     handleInputChange(index, 'school', e.target.value)
//                   }
//                   className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//               </div>
//             </div>
//             <button
//               type="button"
//               onClick={() => handleRemoveRegistrant(index)}
//               className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
//             >
//               Remove Registrant
//             </button>
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={handleAddRegistrant}
//           className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md"
//         >
//           Add Registrant
//         </button>
//         <button
//           type="submit"
//           className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md ml-4"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RegistrationPage;




'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";

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
    <div className="container mx-auto py-8">
      <Card className='bg-transparent'>
        <CardHeader>
          <CardTitle className="text-3xl">REGISTER PARTICIPANT</CardTitle>
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
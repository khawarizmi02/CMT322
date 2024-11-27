// 'use client';
// import React from 'react';
// import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
// import { CirclePlus, Plus, Trash2, Users, Volleyball } from 'lucide-react';

// // Test only
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { SportsListDetailsCopy } from '@/data/mock-sportslist-copy';

// // Zod schema for form validation
// const registrantTeamSchema = z.object({
//     registrantsTeam: z.array(
//       z.object({
//         teamName: z.string().nonempty("Team is required"),
//         desasiswa: z.string().nonempty("Desasiswa is required"),
//         registrants: z.array(
//           z.object({
//             teamMembersName: z.string().nonempty("Name is required"),
//             matricNumber: z.string().nonempty("Matric Number is required"),
//           })
//         )
//       })
//     )
//   });

// const AddSportCategorySchema = z.object({
//   sportsCategoryName: z.string().nonempty('Sport category name is required'),
//   sportsCategoryDesc: z.string().nonempty('Sport category description is required'),
// });

// const CreateSportCategoryForm: React.FC = () => {
//   const methods = useForm<z.infer<typeof AddSportCategorySchema>>({
//     resolver: zodResolver(AddSportCategorySchema),
//     defaultValues: {
//         sportsCategoryName: '',
//         sportsCategoryDesc: '',
//     },
//   });

//   // Handle form submission
//   const onSubmit = (data: z.infer<typeof AddSportCategorySchema>) => {
//     console.log('Sports Category:', data);
//     // Add your submission logic here
//   };

//   // Initialize form with react-hook-form and zod
//   const form = useForm<z.infer<typeof registrantTeamSchema>>({
//     resolver: zodResolver(registrantTeamSchema),
//     defaultValues: {
//       registrantsTeam: [
//         { teamName: '', desasiswa: '', registrants: [{ teamMembersName: '', matricNumber: '' }] }
//       ]
//     }
//   });

//   // Use field array to manage dynamic form fields
//   const { fields, append, remove } = useFieldArray({
//     control: form.control,
//     name: "registrantsTeam",
//   });

//   // Use field array to manage dynamic form fields
//   const { fields: fieldss, append: appendss, remove: removess } = useFieldArray({
//     control: form.control,
//     name: `registrantsTeam.${0}.registrants`,
//   });

//   // Handle form submission
//   const onSSubmit = (data: z.infer<typeof registrantTeamSchema>) => {
//     console.log('Registrants:', data);
//     // Add your submission logic here
//   };

//   return (
//     <div className="bg-transparent from-background to-secondary/10">
//       <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8 overflow-hidden min-w-[800px]">
//         <div className="flex items-center gap-4 mb-8">
//           <Volleyball className="h-8 w-8 text-primary" />
//           <div>
//             <h1 className="text-4xl font-bold tracking-tight">Add Sport Category</h1>
//             <p className="text-muted-foreground mt-1">Add new categories based on the selected sports</p>
//           </div>
//         </div>

//         <Card className="bg-white border-2 min-w-[680px] py-2 px-2">
//           <CardHeader>
//             <CardTitle className="text-2xl flex items-center gap-2">
//               <CirclePlus className="h-6 w-6" />
//               Sport Category Details
//             </CardTitle>
//             <CardDescription>
//             Provide the details below to add a new sport category
//             </CardDescription>
//           </CardHeader>

//           <CardContent>
//             <FormProvider {...methods}>
//               <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
//                 <FormField
//                   name="sportsCategoryName"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Sport Category Name</FormLabel>
//                       <Input {...field} placeholder="Enter sport category name" />
//                       <FormMessage>{methods.formState.errors.sportsCategoryName?.message}</FormMessage>
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   name="sportsCategoryDesc"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Sport Category Description</FormLabel>
//                       <textarea
//                         {...field}
//                         placeholder="Enter sport category description"
//                         className="block w-full rounded-md border py-2 px-3 focus:outline-none resize-y overflow-auto h-60"
//                       />
//                       <FormMessage>{methods.formState.errors.sportsCategoryDesc?.message}</FormMessage>
//                     </FormItem>
//                   )}
//                 />

                
                
//                 <div className="container mx-auto py-4">
//                     <Card className='bg-transparent'>
//                       <CardHeader>
//                         <CardTitle className="text-2xl flex items-center gap-2">
//                           <Users className="h-6 w-6" />
//                           Add Team
//                         </CardTitle>
//                         <CardDescription>
//                           Provide the details about the teams who participate in this sport category
//                         </CardDescription>
//                       </CardHeader>
                      
//                       {fields.map((field, indexTeam) => (
//                         field.registrants.map((registrant, indexMember) => (

//                       <CardContent>
//                         <form onSubmit={form.handleSubmit(onSSubmit)} className="space-y-4">

//                           <div className="grid grid-cols-2 gap-4">
//                             <FormField
//                               name="team"
//                               render={({ field: inputField }) => (
//                                 <FormItem>
//                                   <FormLabel>Team {indexTeam + 1}</FormLabel>
//                                   <Select
//                                     onValueChange={inputField.onChange}
//                                     defaultValue="Team Titans"
//                                   >
//                                     <FormControl>
//                                       <SelectTrigger>
//                                         <SelectValue placeholder="Select a team" />
//                                       </SelectTrigger>
//                                     </FormControl>
//                                     <SelectContent>
//                                       <SelectItem value="Team Titans">Team Titans</SelectItem>
//                                       <SelectItem value="Team Alpha">Team Alpha</SelectItem>
//                                       <SelectItem value="Team Beta">Team Beta</SelectItem>
//                                       <SelectItem value="Team Galaxy">Team Galaxy</SelectItem>
//                                       <SelectItem value="Team Comet">Team Comet</SelectItem>
//                                       <SelectItem value="Team Venus">Team Venus</SelectItem>
//                                     </SelectContent>
//                                   </Select>
//                                   <FormMessage />
//                                 </FormItem>
//                               )} />

//                             <FormField
//                               name="desasiswa"
//                               render={({ field: inputField }) => (
//                                 <FormItem>
//                                   <FormLabel>Desasiswa</FormLabel>
                                  // <Select
                                  //   onValueChange={inputField.onChange}
                                  //   defaultValue="Desasiswa Tekun"
                                  // >
                                  //   <FormControl>
                                  //     <SelectTrigger>
                                  //       <SelectValue placeholder="Select a desasiswa" />
                                  //     </SelectTrigger>
                                  //   </FormControl>
                                  //   <SelectContent>
                                  //     <SelectItem value="Desasiswa Tekun">Desasiswa Tekun</SelectItem>
                                  //     <SelectItem value="Desasiswa Restu">Desasiswa Restu</SelectItem>
                                  //     <SelectItem value="Desasiswa Saujana">Desasiswa Saujana</SelectItem>
                                  //     <SelectItem value="Desasiswa Indah Kembara">Desasiswa Indah Kembara</SelectItem>
                                  //     <SelectItem value="Desasiswa Aman Damai">Desasiswa Aman Damai</SelectItem>
                                  //     <SelectItem value="Desasiswa Bakti Fajar Permai Petas">Desasiswa Bakti Fajar Permai Petas</SelectItem>
                                  //     <SelectItem value="Desasiswa Cahaya Gemilang Harapan">Desasiswa Cahaya Gemilang Harapan</SelectItem>
                                  //     <SelectItem value="Desasiswa Murni Nurani">Desasiswa Murni Nurani</SelectItem>
                                  //     <SelectItem value="Desasiswa Jaya Lembaran Utama">Desasiswa Jaya Lembaran Utama</SelectItem>
                                  //   </SelectContent>
                                  // </Select>
//                                   <FormMessage />
//                                 </FormItem>
//                               )} />
//                           </div>

//                           <Card className="bg-white">
//                             {fields.map((field, indexTeam) => (
//                             field.registrants.map((registrant, indexMember) => (
//                             <CardContent key={`${indexTeam}-${indexMember}`} className="grid grid-cols-8 gap-4 py-2">
//                               <FormField
//                                 control={form.control}
//                                 name={`registrantsTeam.${indexTeam}.registrants.${indexMember}.teamMembersName`}
//                                 render={({ field: inputField }) => (
//                                   <FormItem className="col-span-5">
//                                     <FormLabel>Name Team Member {indexMember + 1}</FormLabel>
//                                     <FormControl>
//                                       <Input {...inputField} />
//                                     </FormControl>
//                                     <FormMessage />
//                                   </FormItem>
//                                 )} />

//                               <FormField
//                                 control={form.control}
//                                 name={`registrantsTeam.${indexTeam}.registrants.${indexMember}.matricNumber`}
//                                 render={({ field: inputField }) => (
//                                   <FormItem className="col-span-2">
//                                     <FormLabel>Matric Number</FormLabel>
//                                     <FormControl>
//                                       <Input {...inputField} />
//                                     </FormControl>
//                                     <FormMessage />
//                                   </FormItem>
//                                 )} />

//                               {fields.length > 1 && (
//                                 <Button
//                                   type="button"
//                                   variant="destructive"
//                                   className="col-span-1 mt-4"
//                                   onClick={() => remove(indexMember)}
//                                 >
//                                   <Trash2 className="h-6 w-6" />
//                                 </Button>
//                               )}
//                             </CardContent>
//                             ))
//                             ))}
//                           </Card>

//                           <div className="flex space-x-4 gap-2">
//                             <Button
//                               type="button"
//                               onClick={() => appendss({
//                                 teamMembersName: '',
//                                 matricNumber: ''
//                               })}
//                             >
//                               <Plus className="h-6 w-6" /> Add Team Members
//                             </Button>

//                             {fields.length > 1 && (
//                                 <Button
//                                   type="button"
//                                   variant="destructive"
//                                   onClick={() => remove(indexTeam)}
//                                 >
//                                   <Trash2 className="h-6 w-6" /> Remove this team
//                                 </Button>
//                               )}
//                           </div>
//                         </form>
//                       </CardContent>
//                       ))
//                       ))}
//                     </Card>

//                     <div className="flex space-x-4 pt-4">
//                       <Button
//                         type="button"
//                         onClick={() => append({
//                           teamName: '',
//                           desasiswa: '',
//                           registrants: [{
//                             teamMembersName: '',
//                             matricNumber: ''
//                           }]
//                         })}
//                       >
//                         Add Another Team
//                       </Button>
//                     </div>
//                   </div>

//                 <Button type="submit" className="w-full">Create Sport Category</Button>
//               </form>
//             </FormProvider>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
  
//   );
// };

// export default CreateSportCategoryForm;











// Team Card Only
// 'use client';
// import React from 'react';
// import { useForm, useFieldArray, FormProvider } from 'react-hook-form';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { FormField, FormItem, FormLabel, FormMessage, FormControl } from '@/components/ui/form';
// import { Trash2, Plus } from 'lucide-react';

// interface TeamMember {
//   teamMembersName: string;
//   matricNumber: string;
// }

// interface Team {
//   teamName: string;
//   desasiswa: string;
//   registrants: TeamMember[];
// }

// const TeamForm: React.FC = () => {
//   const methods = useForm({
//     defaultValues: {
//       teams: [
//         {
//           teamName: '',
//           desasiswa: '',
//           registrants: [{ teamMembersName: '', matricNumber: '' }],
//         },
//       ],
//     },
//   });

//   const { control, handleSubmit } = methods;
//   const { fields: teamFields, append: appendTeam, remove: removeTeam } = useFieldArray({
//     control,
//     name: 'teams',
//   });

//   const onSubmit = (data: { teams: Team[] }) => {
//     console.log('Form data:', data);
//     // Handle form submission
//   };

//   return (
    // <FormProvider {...methods}>
    //   <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
    //     {teamFields.map((team, indexTeam) => (
    //       <Card key={team.id}>
    //         <CardHeader>
    //           <CardTitle>Team {indexTeam + 1}</CardTitle>
    //         </CardHeader>
    //         <CardContent>
    //           <div className="grid grid-cols-2 gap-4">
    //             <FormField
    //               control={control}
    //               name={`teams.${indexTeam}.teamName`}
    //               render={({ field }) => (
    //                 <FormItem>
    //                   <FormLabel>Team Name</FormLabel>
    //                   <FormControl>
    //                     <Input {...field} placeholder="Enter team name" />
    //                   </FormControl>
    //                   <FormMessage />
    //                 </FormItem>
    //               )}
    //             />
    //             <FormField
    //               control={control}
    //               name={`teams.${indexTeam}.desasiswa`}
    //               render={({ field }) => (
    //                 <FormItem>
    //                   <FormLabel>Desasiswa</FormLabel>
    //                   <FormControl>
    //                     <Input {...field} placeholder="Enter desasiswa" />
    //                   </FormControl>
    //                   <FormMessage />
    //                 </FormItem>
    //               )}
    //             />
    //             <Button
    //               type="button"
    //               variant="destructive"
    //               onClick={() => removeTeam(indexTeam)}
    //             >
    //               <Trash2 className="h-6 w-6" /> Delete Team
    //             </Button>
    //           </div>
    //           <div className="space-y-4 mt-4">
    //             <FormField
    //               control={control}
    //               name={`teams.${indexTeam}.registrants`}
    //               render={({ field }) => (
    //                 <>
    //                   {field.value.map((registrant: TeamMember, indexRegistrant: number) => (
    //                     <div key={indexRegistrant} className="grid grid-cols-2 gap-4">
    //                       <FormField
    //                         control={control}
    //                         name={`teams.${indexTeam}.registrants.${indexRegistrant}.teamMembersName`}
    //                         render={({ field }) => (
    //                           <FormItem>
    //                             <FormLabel>Team Member Name</FormLabel>
    //                             <FormControl>
    //                               <Input {...field} placeholder="Enter team member name" />
    //                             </FormControl>
    //                             <FormMessage />
    //                           </FormItem>
    //                         )}
    //                       />
    //                       <FormField
    //                         control={control}
    //                         name={`teams.${indexTeam}.registrants.${indexRegistrant}.matricNumber`}
    //                         render={({ field }) => (
    //                           <FormItem>
    //                             <FormLabel>Matric Number</FormLabel>
    //                             <FormControl>
    //                               <Input {...field} placeholder="Enter matric number" />
    //                             </FormControl>
    //                             <FormMessage />
    //                           </FormItem>
    //                         )}
    //                       />
    //                       <Button
    //                         type="button"
    //                         variant="destructive"
    //                         onClick={() => {
    //                           const newRegistrants = [...field.value];
    //                           newRegistrants.splice(indexRegistrant, 1);
    //                           field.onChange(newRegistrants);
    //                         }}
    //                       >
    //                         <Trash2 className="h-6 w-6" /> Delete Member
    //                       </Button>
    //                     </div>
    //                   ))}
    //                   <Button
    //                     type="button"
    //                     onClick={() => {
    //                       const newRegistrants = [...field.value, { teamMembersName: '', matricNumber: '' }];
    //                       field.onChange(newRegistrants);
    //                     }}
    //                   >
    //                     <Plus className="h-6 w-6" /> Add Team Member
    //                   </Button>
    //                 </>
    //               )}
    //             />
    //           </div>
    //         </CardContent>
    //       </Card>
    //     ))}
    //     <Button
    //       type="button"
    //       onClick={() =>
    //         appendTeam({
    //           teamName: '',
    //           desasiswa: '',
    //           registrants: [{ teamMembersName: '', matricNumber: '' }],
    //         })
    //       }
    //     >
    //       <Plus className="h-6 w-6" /> Add Team
    //     </Button>
    //     <Button type="submit" className="w-full">
    //       Submit
    //     </Button>
    //   </form>
    // </FormProvider>
//   );
// };

// export default TeamForm;












'use client';
import React from 'react';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { CirclePlus, Plus, Trash2, Users, Volleyball } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SportsListDetailsCopy } from '@/data/mock-sportslist-copy';

interface TeamMember {
    teamMembersName: string;
    matricNumber: string;
  }
  
  interface Team {
    teamName: string;
    desasiswa: string;
    registrants: TeamMember[];
  }

// Zod schema for form validation
const registrantTeamSchema = z.object({
    registrantsTeam: z.array(
      z.object({
        teamName: z.string().nonempty("Team is required"),
        desasiswa: z.string().nonempty("Desasiswa is required"),
        registrants: z.array(
          z.object({
            teamMembersName: z.string().nonempty("Name is required"),
            matricNumber: z.string().nonempty("Matric Number is required"),
          })
        )
      })
    )
  });

const AddSportCategorySchema = z.object({
  sportsCategoryName: z.string().nonempty('Sport category name is required'),
  sportsCategoryDesc: z.string().nonempty('Sport category description is required'),
});

const CreateSportCategoryForm: React.FC = () => {
  const form = useForm({
        defaultValues: {
          teams: [
            {
              teamName: '',
              desasiswa: '',
              registrants: [{ teamMembersName: '', matricNumber: '' }],
            },
          ],
        },
      });

  const methods = useForm<z.infer<typeof AddSportCategorySchema>>({
    resolver: zodResolver(AddSportCategorySchema),
    defaultValues: {
        sportsCategoryName: '',
        sportsCategoryDesc: '',
    },
  });

  const { control, handleSubmit } = form;
  const { fields: teamFields, append: appendTeam, remove: removeTeam } = useFieldArray({
    control,
    name: 'teams',
  });

  const onSSubmit = (data: { teams: Team[] }) => {
    console.log('Form data:', data);
    // Handle form submission
  };

  // Handle form submission
  const onSubmit = (data: z.infer<typeof AddSportCategorySchema>) => {
    console.log('Sports Category:', data);
    // Add your submission logic here
  };

  return (
    <div className="bg-transparent from-background to-secondary/10">
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8 overflow-hidden min-w-[800px]">
        <div className="flex items-center gap-4 mb-8">
          <Volleyball className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Add Sport Category</h1>
            <p className="text-muted-foreground mt-1">Add new categories based on the selected sports</p>
          </div>
        </div>

        <Card className="bg-white border-2 min-w-[680px] py-2 px-2">
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
                      
                      <FormProvider {...form}>
                        <form onSubmit={handleSubmit(onSSubmit)} className="space-y-4">
                          {teamFields.map((team, indexTeam) => (
                            <Card key={team.id}>
                              <CardHeader>
                                <CardTitle>Team {indexTeam + 1}</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="grid grid-cols-7 gap-4">
                                  <FormField
                                    control={control}
                                    name={`teams.${indexTeam}.teamName`}
                                    render={({ field }) => (
                                      <FormItem className='col-span-3'>
                                        {/* <FormLabel>Team Name</FormLabel>
                                        <FormControl>
                                          <Input {...field} placeholder="Enter team name" />
                                        </FormControl>
                                        <FormMessage /> */}
                                        <Select
                                          onValueChange={field.onChange}
                                          defaultValue="Team Titans"
                                        >
                                          <FormControl>
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select a team" />
                                            </SelectTrigger>
                                          </FormControl>
                                          <SelectContent>
                                            <SelectItem value="Team Titans">Team Titans</SelectItem>
                                            <SelectItem value="Team Alpha">Team Alpha</SelectItem>
                                            <SelectItem value="Team Beta">Team Beta</SelectItem>
                                            <SelectItem value="Team Galaxy">Team Galaxy</SelectItem>
                                            <SelectItem value="Team Comet">Team Comet</SelectItem>
                                            <SelectItem value="Team Venus">Team Venus</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={control}
                                    name={`teams.${indexTeam}.desasiswa`}
                                    render={({ field }) => (
                                      <FormItem className='col-span-3'>
                                        {/* <FormLabel>Desasiswa</FormLabel>
                                        <FormControl>
                                          <Input {...field} placeholder="Enter desasiswa" />
                                        </FormControl>
                                        <FormMessage /> */}
                                        <Select
                                          onValueChange={field.onChange}
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
                                      </FormItem>
                                    )}
                                  />
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    className='col-span-1'
                                    onClick={() => removeTeam(indexTeam)}
                                  >
                                    Delete Team
                                  </Button>
                                </div>
                                <div className="space-y-4 mt-4">
                                  <FormField
                                    control={control}
                                    name={`teams.${indexTeam}.registrants`}
                                    render={({ field }) => (
                                      <>
                                        {field.value.map((registrant: TeamMember, indexRegistrant: number) => (
                                          <div key={indexRegistrant} className="grid grid-cols-8 gap-4">
                                            <FormField
                                              control={control}
                                              name={`teams.${indexTeam}.registrants.${indexRegistrant}.teamMembersName`}
                                              render={({ field }) => (
                                                <FormItem className='col-span-5'>
                                                  {/* <FormLabel>Team Member Name</FormLabel> */}
                                                  <FormControl>
                                                    <Input {...field} placeholder="Enter team member name" />
                                                  </FormControl>
                                                  <FormMessage />
                                                </FormItem>
                                              )}
                                            />
                                            <FormField
                                              control={control}
                                              name={`teams.${indexTeam}.registrants.${indexRegistrant}.matricNumber`}
                                              render={({ field }) => (
                                                <FormItem className='col-span-2'>
                                                  {/* <FormLabel>Matric Number</FormLabel> */}
                                                  <FormControl>
                                                    <Input {...field} placeholder="Enter matric number" />
                                                  </FormControl>
                                                  <FormMessage />
                                                </FormItem>
                                              )}
                                            />
                                            <Button
                                              type="button"
                                              variant="destructive"
                                              className='col-span-1'
                                              onClick={() => {
                                                const newRegistrants = [...field.value];
                                                newRegistrants.splice(indexRegistrant, 1);
                                                field.onChange(newRegistrants);
                                              }}
                                            >
                                              <Trash2 className="h-6 w-6" />
                                            </Button>
                                          </div>
                                        ))}
                                        <Button
                                          type="button"
                                          onClick={() => {
                                            const newRegistrants = [...field.value, { teamMembersName: '', matricNumber: '' }];
                                            field.onChange(newRegistrants);
                                          }}
                                        >
                                          <Plus className="h-6 w-6" /> Add Team Member
                                        </Button>
                                      </>
                                    )}
                                  />
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                          <div className='px-6'>
                            <Button
                              type="button"
                              onClick={() =>
                                appendTeam({
                                  teamName: '',
                                  desasiswa: '',
                                  registrants: [{ teamMembersName: '', matricNumber: '' }],
                                })
                              }
                            >
                              <Plus className="h-6 w-6" /> Add Another Team
                            </Button>
                          </div>
                        </form>
                      </FormProvider>
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
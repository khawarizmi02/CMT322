// import React, { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { useForm } from 'react-hook-form';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { PlusIcon } from 'lucide-react';

// const CreateMatchForm = ({ onClose }: { onClose: () => void }) => {
//   const form = useForm();
//   const [loading, setLoading] = useState(false);

//   const onSubmit = async (data: any) => {
//     setLoading(true);
//     try {
//       const response = await fetch('/api/sports/matches', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ match: data }),
//       });

//       if (response.ok) {
//         form.reset();
//         onClose();
//       } else {
//         console.error('Failed to create match');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//         <FormField
//           name="sportCategoryID"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Sport Category ID</FormLabel>
//               <FormControl>
//                 <Input {...field} required />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           name="date"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Date</FormLabel>
//               <FormControl>
//                 <Input type="date" {...field} required />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           name="time"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Time</FormLabel>
//               <FormControl>
//                 <Input type="time" {...field} required />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           name="venue"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Venue</FormLabel>
//               <FormControl>
//                 <Input {...field} required />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           name="status"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Status</FormLabel>
//               <FormControl>
//                 <Input {...field} required />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           name="category"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Category</FormLabel>
//               <FormControl>
//                 <Input {...field} required />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <div className='flex items-center space-x-2'>
//           <FormField
//             name="teams"
//             render={({ field }) => (
//               <FormItem className='flex-1'>
//                 <FormLabel>Teams</FormLabel>
//                 <div className="flex space-x-2">
//                   <FormControl>
//                     <Input {...field} required />
//                   </FormControl>
//                   <Button type="button" variant="default" size="icon">
//                     <PlusIcon size={16} />
//                   </Button>
//                 </div>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>
//         <div className='flex items-center space-x-2'>
//           <FormField
//             name="participants"
//             render={({ field }) => (
//               <FormItem className='flex-1'>
//                 <FormLabel>Participants</FormLabel>
//                 <div className="flex space-x-2">
//                   <FormControl>
//                     <Input {...field} required />
//                   </FormControl>
//                   <Button type="button" variant="default" size="icon">
//                     <PlusIcon size={16} />
//                   </Button>
//                 </div>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>
//         <Button type="submit" disabled={loading}>
//           {loading ? 'Creating...' : 'Create Match'}
//         </Button>
//       </form>
//     </Form>
//   );
// };

// export default CreateMatchForm;





import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { PlusIcon, TrashIcon } from 'lucide-react';
import { matches } from '@/data/type';

interface CreateMatchFormProps {
  onClose: () => void;
}

const CreateMatchForm = ({ onClose }: CreateMatchFormProps) => {
  const form = useForm<matches>({
    defaultValues: {
      sportID: '',
      sportCategoryID: '',
      matchDate: '',
      matchTime: '',
      matchVenue: '',
      matchStatus: 'upcoming',
      sportName: '',
      sportCategory: '',
      teams: [{
        name: '',
        desasiswa: '',
        participants: [{ name: '', matricNo: '', desasiswa: '' }]
      }],
      participants: [{ name: '', matricNo: '', desasiswa: '' }],
    },
  });
  const [loading, setLoading] = useState(false);

  const addTeam = () => {
    const currentTeams = form.getValues('teams') || [];
    form.setValue('teams', [
      ...currentTeams,
      {
        name: '',
        desasiswa: '',
        participants: [{ name: '', matricNo: '', desasiswa: '' }]
      }
    ]);
  };

  const removeTeam = (teamIndex: number) => {
    const currentTeams = form.getValues('teams') || [];
    if (currentTeams.length > 1) {
      const newTeams = currentTeams.filter((_, i) => i !== teamIndex);
      form.setValue('teams', newTeams);
    }
  };

  const addTeamParticipant = (teamIndex: number) => {
    const currentTeams = form.getValues('teams');
    if (currentTeams?.[teamIndex]) {
      const currentParticipants = currentTeams[teamIndex].participants || [];
      const updatedTeam = {
        ...currentTeams[teamIndex],
        participants: [...currentParticipants, { name: '', matricNo: '', desasiswa: '' }]
      };
      const newTeams = [...currentTeams];
      newTeams[teamIndex] = updatedTeam;
      form.setValue('teams', newTeams);
    }
  };

  const removeTeamParticipant = (teamIndex: number, participantIndex: number) => {
    const currentTeams = form.getValues('teams') || [];
    if ((currentTeams[teamIndex]?.participants ?? []).length > 1) {
      const newParticipants = (currentTeams[teamIndex]?.participants ?? []).filter((_, i) => i !== participantIndex);
      const newTeams = [...currentTeams];
      newTeams[teamIndex] = { ...newTeams[teamIndex], participants: newParticipants };
      form.setValue('teams', newTeams);
    }
  };

  const renderParticipantFields = (
    participantPath: string,
    onRemove?: () => void,
    canAdd?: () => void
  ) => {
    return (
      <div className="space-y-4 p-4 border rounded-lg">
        <FormField
          name={`${participantPath}.name`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name={`${participantPath}.matricNo`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Matric No</FormLabel>
              <FormControl>
                <Input {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name={`${participantPath}.desasiswa`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Desasiswa</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2">
          {canAdd && (
            <Button type="button" variant="default" size="sm" onClick={canAdd}>
              <PlusIcon size={16} className="mr-1" /> Add Participant
            </Button>
          )}
          {onRemove && (
            <Button type="button" variant="default" size="sm" onClick={onRemove}>
              <TrashIcon size={16} className="mr-1" /> Remove
            </Button>
          )}
        </div>
      </div>
    );
  };

  const renderTeamFields = () => {
    const teams = form.watch('teams') || [];

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <FormLabel>Teams</FormLabel>
          <Button type="button" variant="default" size="sm" onClick={addTeam}>
            <PlusIcon size={16} className="mr-1" /> Add Team
          </Button>
        </div>
        {teams.map((team, teamIndex) => (
          <div key={teamIndex} className="space-y-4 p-4 border rounded-lg">
            <FormField
              name={`teams.${teamIndex}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team Name</FormLabel>
                  <FormControl>
                    <Input {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={`teams.${teamIndex}.desasiswa`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team Desasiswa</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-4">
              <FormLabel>Team Participants</FormLabel>
              {team.participants?.map((_, participantIndex) => (
                <div key={participantIndex}>
                  {renderParticipantFields(
                    `teams.${teamIndex}.participants.${participantIndex}`,
                    () => removeTeamParticipant(teamIndex, participantIndex),
                    () => addTeamParticipant(teamIndex)
                  )}
                </div>
              ))}
            </div>
            {teams.length > 1 && (
              <Button
                type="button"
                variant="default"
                size="sm"
                onClick={() => removeTeam(teamIndex)}
                className="w-full"
              >
                <TrashIcon size={16} className="mr-1" /> Remove Team
              </Button>
            )}
          </div>
        ))}
      </div>
    );
  };

  // const onSubmit: SubmitHandler<matches> = async (data) => {
  async function onSubmit(data: matches) {
    setLoading(true);

    console.log('Adding new match:', data);

    try {
      const response = await fetch(`/api/sports/${data.sportCategoryID}/matches`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ match: data }),
      });

      if (response.ok) {
        form.reset();
        onClose();
      } else {
        console.error('Failed to create match');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          name="sportID"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sport ID</FormLabel>
              <FormControl>
                <Input {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="sportCategoryID"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sport Category ID</FormLabel>
              <FormControl>
                <Input {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="matchDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="matchTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time</FormLabel>
              <FormControl>
                <Input type="time" {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="matchVenue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Venue</FormLabel>
              <FormControl>
                <Input {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="sportName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sport Name</FormLabel>
              <FormControl>
                <Input {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="sportCategory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sport Category</FormLabel>
              <FormControl>
                <Input {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {renderTeamFields()}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Creating...' : 'Create Match'}
        </Button>
      </form>
    </Form>
  );
};

export default CreateMatchForm;
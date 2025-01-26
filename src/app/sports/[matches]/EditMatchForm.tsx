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

const searchParams = new URLSearchParams(window.location.search);
const sportCategoryID = searchParams.get('sportCategoryID');

interface EditMatchFormProps {
  onClose: () => void;
}

const EditMatchForm = ({ onClose }: EditMatchFormProps) => {
  const form = useForm<matches>({
    defaultValues: {
      sportCategoryID: sportCategoryID || '',
      matchDate: '',
      matchTime: '',
      matchVenue: '',
      matchStatus: 'upcoming',
      sportName: '',
      sportCategory: '',
      teams: [{
        name: '',
        desasiswa: '',
        participants: [{ name: '', matricNo: '' }]
      }],
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
        participants: [{ name: '', matricNo: '' }]
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
    participantIndex: number,
    onRemove?: () => void,
    canAdd?: () => void
  ) => {
    return (
      <div className="space-y-4 p-4 border rounded-lg shadow-lg bg-white">
        <div className='flex flex-row space-x-4 w-full'>
          <FormField
            name={`${participantPath}.name`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Participant {participantIndex + 1} - Name</FormLabel>
                <FormControl>
                  <Input placeholder='Enter participant name' {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name={`${participantPath}.matricNo`}
            render={({ field }) => (
              <FormItem className="w-1/5">
                <FormLabel>Matric No</FormLabel>
                <FormControl>
                  <Input placeholder='Enter matric number' {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
          <div key={teamIndex} className="space-y-4 p-4 border rounded-lg shadow-lg bg-white">
            <FormField
              name={`teams.${teamIndex}.name`}
              render={({ field }) => (
                <FormItem>
                    <FormLabel>Team {teamIndex + 1} - Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter team name' {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={`teams.${teamIndex}.desasiswa`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Desasiswa</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter desasiswa' {...field} />
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
                    participantIndex,
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
                <Input placeholder='Enter venue' {...field} required />
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
                <Input placeholder='Enter sport name' {...field} required />
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
                <Input placeholder='Enter sport category' {...field} required />
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

export default EditMatchForm;
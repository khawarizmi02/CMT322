'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, User, Plus, Trash2 } from 'lucide-react';
import { DESASISWA_LIST, SPORTS_LIST, BADMINTON_CATEGORIES, TRACKS_CATEGORIES, VOLLEYBALL_CATEGORIES } from '@/data/type';
import { toast } from '@/hooks/use-toast';

const RegistrationForm = () => {
    const [selectedSport, setSelectedSport] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [participants, setParticipants] = useState([{ name: '', matricNo: '', desasiswa: '' }]);
    const [teamName, setTeamName] = useState('');
    const [teamDesasiswa, setTeamDesasiswa] = useState('');

    const getCategoriesForSport = (sport: string) => {
        switch (sport) {
            case 'Badminton':
                return BADMINTON_CATEGORIES;
            case 'Track':
                return TRACKS_CATEGORIES;
            case 'Volleyball':
                return VOLLEYBALL_CATEGORIES;
            default:
                return [];
        }
    };

    const isTeamSport = (category: string) => {
        return category.includes('Doubles') || 
               category.includes('Relay') || 
               category.includes('Volleyball');
    };

    const addParticipant = () => {
        setParticipants([...participants, { name: '', matricNo: '', desasiswa: '' }]);
    };

    const removeParticipant = (index: number) => {
        setParticipants(participants.filter((_, i) => i !== index));
    };

    const updateParticipant = (index: number, field: string, value: string) => {
        const newParticipants = [...participants];
        newParticipants[index] = { ...newParticipants[index], [field]: value };
        setParticipants(newParticipants);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = isTeamSport(selectedCategory) 
            ? {
                name: teamName,
                desasiswa: teamDesasiswa,
                participants
              }
            : participants[0];
        console.log('Submitted:', formData);
        //Submit the form data to the database
        try{
          const response = await fetch('/api/organizer/registration', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          if (!response.ok) {
            throw new Error('Failed to submit registration');
          }
        }

        catch(e){
          console.log('Error:', e);
        }

        toast({
            title: 'Success',
            description: 'Registration submitted successfully',
        });
        //Reset the form
        setSelectedSport('');
        setSelectedCategory('');
        setParticipants([{ name: '', matricNo: '', desasiswa: '' }]);
        setTeamName('');
        setTeamDesasiswa('');
    };

    return (
        <div className="container mx-auto p-6">
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        {isTeamSport(selectedCategory) ? <Users className="h-6 w-6" /> : <User className="h-6 w-6" />}
                        Sports Registration Form
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="sport">Sport</Label>
                                <Select 
                                    onValueChange={value => {
                                        setSelectedSport(value);
                                        setSelectedCategory('');
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a sport" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {SPORTS_LIST.map(sport => (
                                            <SelectItem key={sport} value={sport}>
                                                {sport}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {selectedSport && (
                                <div className="grid gap-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Select 
                                        onValueChange={setSelectedCategory}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {getCategoriesForSport(selectedSport).map(category => (
                                                <SelectItem key={category} value={category}>
                                                    {category}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}

                            {selectedCategory && isTeamSport(selectedCategory) && (
                                <div className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="teamName">Team Name</Label>
                                        <Input
                                            id="teamName"
                                            value={teamName}
                                            onChange={(e) => setTeamName(e.target.value)}
                                            placeholder="Enter team name"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="teamDesasiswa">Team Desasiswa</Label>
                                        <Select 
                                            onValueChange={setTeamDesasiswa}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a desasiswa" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {DESASISWA_LIST.map(desasiswa => (
                                                    <SelectItem key={desasiswa} value={desasiswa}>
                                                        {desasiswa}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            )}

                            {selectedCategory && (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label>Participants</Label>
                                        {isTeamSport(selectedCategory) && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={addParticipant}
                                                className="flex items-center gap-2"
                                            >
                                                <Plus className="h-4 w-4" /> Add Participant
                                            </Button>
                                        )}
                                    </div>
                                    
                                    {participants.map((participant, index) => (
                                        <div key={index} className="space-y-4 p-4 border rounded-lg">
                                            <div className="flex justify-between items-center">
                                                <Label>Participant {index + 1}</Label>
                                                {isTeamSport(selectedCategory) && participants.length > 1 && (
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => removeParticipant(index)}
                                                    >
                                                        <Trash2 className="h-4 w-4 text-red-500" />
                                                    </Button>
                                                )}
                                            </div>
                                            <div className="grid gap-4">
                                                <div className="grid gap-2">
                                                    <Label>Name</Label>
                                                    <Input
                                                        value={participant.name}
                                                        onChange={(e) => updateParticipant(index, 'name', e.target.value)}
                                                        placeholder="Enter participant name"
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label>Matric No</Label>
                                                    <Input
                                                        value={participant.matricNo}
                                                        onChange={(e) => updateParticipant(index, 'matricNo', e.target.value)}
                                                        placeholder="Enter matric number"
                                                    />
                                                </div>
                                                {!isTeamSport(selectedCategory) && (
                                                    <div className="grid gap-2">
                                                        <Label>Desasiswa</Label>
                                                        <Select 
                                                            onValueChange={(value) => updateParticipant(index, 'desasiswa', value)}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select a desasiswa" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {DESASISWA_LIST.map(desasiswa => (
                                                                    <SelectItem key={desasiswa} value={desasiswa}>
                                                                        {desasiswa}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {selectedCategory && (
                            <Button type="submit" className="w-full">
                                Submit Registration
                            </Button>
                        )}
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default RegistrationForm;
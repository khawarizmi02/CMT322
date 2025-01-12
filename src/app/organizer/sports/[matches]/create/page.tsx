"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarDays, Clock, MapPin, Save, AlertCircle, Trophy, Users2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CreateMatchPage = () => {
  const router = useRouter();
  const [eventType, setEventType] = useState('badminton');
  const [date, setDate] = useState<Date>();
  const [showError, setShowError] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    playerAorTeamA: '',
    playerBorTeamB: '',
    desasiswaA: '',
    desasiswaB: '',
    time: '',
    venue: '',
  });

  const categories = {
    badminton: ['Men Singles', 'Women Singles', 'Men Doubles', 'Women Doubles', 'Mixed Doubles'],
    volleyball: ['Men Team', 'Women Team', 'Mixed Team']
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setShowError(false);
  };

  const validateForm = () => {
    const requiredFields = Object.values(formData);
    return requiredFields.every(field => field !== '') && date !== undefined;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      setShowError(true);
      return;
    }

    const newMatch = {
      id: Date.now().toString(),
      type: eventType,
      category: formData.category,
      ...(eventType === 'badminton' 
        ? { 
            playerA: formData.playerAorTeamA,
            playerB: formData.playerBorTeamB
          }
        : {
            teamA: formData.playerAorTeamA,
            teamB: formData.playerBorTeamB
          }
      ),
      desasiswaA: formData.desasiswaA,
      desasiswaB: formData.desasiswaB,
      date: format(date!, 'PP'),
      time: formData.time,
      venue: formData.venue,
      status: 'upcoming' as const,
      scoreA: '0',
      scoreB: '0'
    };

    console.log('Creating new match:', newMatch);
    router.push('/events');
  };

  return (
    <div className="bg-gradient-to-b from-background to-secondary/10 min-h-screen">
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="flex items-center gap-4 mb-8">
          <Trophy className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Create New Match</h1>
            <p className="text-muted-foreground mt-1">Schedule a new match and set up the competition details</p>
          </div>
        </div>

        <Card className="border-2 mb-8 min-w-[680px] overflow-auto">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Users2 className="h-6 w-6" />
              Match Details
            </CardTitle>
            <CardDescription>
              Fill in the information below to create a new {eventType} match
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Event Type and Category Section */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Event Type</Label>
                <Select 
                  value={eventType} 
                  onValueChange={(value) => {
                    setEventType(value);
                    setFormData(prev => ({ ...prev, category: '' }));
                  }}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="badminton">Badminton</SelectItem>
                    <SelectItem value="volleyball">Volleyball</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold">Category</Label>
                <Select 
                  value={formData.category}
                  onValueChange={(value) => handleInputChange('category', value)}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories[eventType as keyof typeof categories].map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator />

            {/* Players/Teams Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Participant Information</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4 p-4 rounded-lg bg-secondary/20">
                  <Label className="text-sm font-semibold">{eventType === 'badminton' ? 'Player A' : 'Team A'}</Label>
                  <Input 
                    className="h-11"
                    placeholder={`Enter ${eventType === 'badminton' ? 'player' : 'team'} name`}
                    value={formData.playerAorTeamA}
                    onChange={(e) => handleInputChange('playerAorTeamA', e.target.value)}
                  />
                  <Input 
                    className="h-11"
                    placeholder="Enter Desasiswa"
                    value={formData.desasiswaA}
                    onChange={(e) => handleInputChange('desasiswaA', e.target.value)}
                  />
                </div>
                <div className="space-y-4 p-4 rounded-lg bg-secondary/20">
                  <Label className="text-sm font-semibold">{eventType === 'badminton' ? 'Player B' : 'Team B'}</Label>
                  <Input 
                    className="h-11"
                    placeholder={`Enter ${eventType === 'badminton' ? 'player' : 'team'} name`}
                    value={formData.playerBorTeamB}
                    onChange={(e) => handleInputChange('playerBorTeamB', e.target.value)}
                  />
                  <Input 
                    className="h-11"
                    placeholder="Enter Desasiswa"
                    value={formData.desasiswaB}
                    onChange={(e) => handleInputChange('desasiswaB', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Date and Time Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Schedule</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-11 justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarDays className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        className="rounded-md border"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Time</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      className="pl-10 h-11"
                      type="time"
                      value={formData.time}
                      onChange={(e) => handleInputChange('time', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Venue Section */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Venue</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  className="pl-10 h-11"
                  placeholder="Enter venue"
                  value={formData.venue}
                  onChange={(e) => handleInputChange('venue', e.target.value)}
                />
              </div>
            </div>

            {showError && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Please fill in all required fields
                </AlertDescription>
              </Alert>
            )}

            <div className="flex gap-4 pt-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.push('/events')}
              >
                Cancel
              </Button>
              <Button 
                className="w-full flex items-center justify-center gap-2"
                onClick={handleSubmit}
              >
                <Save className="h-4 w-4" />
                Create Match
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateMatchPage;
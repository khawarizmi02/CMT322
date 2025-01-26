'use client';

import React, { useState, useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import { Calendar, MapPin, PenSquare, Plus, Trophy, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from '@/components/ui/dialog';

import Matches from './Matches';
import CreateMatchForm from './CreateMatchForm';

export default function MatchesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sportCategoryID = searchParams.get('sportCategoryID');

  const { isSignedIn } = useUser();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateMatch = () => {
    setIsDialogOpen(true);
  };

  const matches = [
    {
      id: '1',
      sportCategoryID: 'Lp9pK4ZbTS4DBOrfydiM',
      date: '2025-01-15',
      time: '15:00',
      venue: 'Stadium A',
      status: 'ongoing',
      category: "Men's Volleyball",
      teams: ['Team A', 'Team B'],
      participants: ['AAA', 'BBB', 'CCC', 'DDD', 'EEE', 'FFF', 'GGG', 'HHH'],
      resultId: 'R001',
    },
    {
      id: '2',
      sportCategoryID: 'Lp9pK4ZbTS4DBOrfydiM',
      date: '2025-01-16',
      time: '18:00',
      venue: 'Arena B',
      status: 'upcoming',
      category: "Men's Volleyball",
      teams: ['Team X', 'Team Y'],
      participants: [
        'Ali',
        'Chong',
        'Raju',
        'John',
        'Mike',
        'Kim',
        'Faizal',
        'Shah',
      ],
      resultId: 'R002',
    },
    {
      id: '3',
      sportCategoryID: 'czaOVNAQOAKZSSubskF9',
      date: '2025-01-17',
      time: '12:00',
      venue: 'Court C',
      status: 'ongoing',
      category: "Women's Volleyball",
      teams: ['Team Alpha', 'Team Beta'],
      participants: [
        'Player 1',
        'Player 2',
        'Player 3',
        'Player 4',
        'Player 5',
        'Player 6',
        'Player 7',
        'Player 8',
      ],
      resultId: 'R003',
    },
    {
      id: '4',
      sportCategoryID: 'czaOVNAQOAKZSSubskF9',
      date: '2025-01-20',
      time: '10:00',
      venue: 'Hall D',
      status: 'ongoing',
      category: "Women's Volleyball",
      teams: ['Team Charlotte', 'Team Delta'],
      participants: [
        'Player a',
        'Player b',
        'Player c',
        'Player d',
        'Player e',
        'Player f',
        'Player g',
        'Player h',
      ],
      resultId: 'R004',
    },
  ];

  const filteredMatches = matches.filter(
    (match) => match.sportCategoryID === sportCategoryID
  );

  const currentMatches = filteredMatches.filter(
    (match) => match.status === 'ongoing'
  );
  const upcomingMatches = filteredMatches.filter(
    (match) => match.status === 'upcoming'
  );
  const pastMatches = filteredMatches.filter(
    (match) => match.status === 'past'
  );

  const MatchCard = ({ match }: { match: (typeof matches)[0] }) => (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-sm text-gray-600">{match.category}</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">
              {match.teams[0]} <span className="text-gray-400">vs</span>{' '}
              {match.teams[1]}
            </h3>
          </div>
          <Button variant="ghost" size="icon">
            <PenSquare className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>{match.date}</span>
            <span className="text-gray-400">|</span>
            <span>{match.time}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>{match.venue}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const [MatchesList, setMatchesList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/sports/${sportCategoryID}/matches`);
      const data = await response.json();
      setMatchesList(data.matchesList);
      console.log('data:', data);
    };
  }, [sportCategoryID]);

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight">Matches</h1>
          <p className="text-muted-foreground">
            View Available Matches of the xxxxx Category
          </p>
        </div>

        {isSignedIn && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" onClick={handleCreateMatch}>
                <Plus className="mr-2 w-4 h-4" /> Create Match
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto max-w-[60vw]">
              <DialogTitle>Create Match</DialogTitle>
              <CreateMatchForm onClose={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Tabs defaultValue="current" className="w-full mx-auto">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="current" className="text-base">
            Current Matches{' '}
            <Badge variant="secondary" className="ml-2 bg-orange-100">
              {currentMatches.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="text-base">
            Upcoming Matches{' '}
            <Badge variant="secondary" className="ml-2 bg-orange-100">
              {upcomingMatches.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="past" className="text-base">
            Past Matches{' '}
            <Badge variant="secondary" className="ml-2 bg-orange-100">
              {pastMatches.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4">
          {currentMatches.length > 0 ? (
            currentMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))
          ) : (
            <Card>
              <CardContent className="p-6 text-center text-gray-500">
                No current matches available
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingMatches.length > 0 ? (
            upcomingMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))
          ) : (
            <Card>
              <CardContent className="p-6 text-center text-gray-500">
                No upcoming matches scheduled
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastMatches.length > 0 ? (
            pastMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))
          ) : (
            <Card>
              <CardContent className="p-6 text-center text-gray-500">
                No past matches found
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Calendar,
  Clock,
  MapPin,
  Trophy,
  Users,
  Filter,
  User,
  Loader2
} from 'lucide-react';
import { matches } from '@/data/type/index';
import EditMatches from '@/components/editMatches';
import firestore from '@/lib/firebase/firestore';

const MatchesPage = () => {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get('category');
  const sportName = window.location.pathname.split('/').pop();

  const [matches, setMatches] = useState<matches[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState(urlCategory || 'All Categories');
  const [filteredMatches, setFilteredMatches] = useState<matches[]>([]);

  // Fetch matches data
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        const data = await firestore.readMatches();
        
        // First filter to only include matches of the selected sport
        const sportMatches = data.filter(match => 
          match.sportName.toLowerCase() === sportName?.toLowerCase()
        );
        
        setMatches(sportMatches);
        
        // Apply category filtering if provided in URL
        let filtered = [...sportMatches];
        if (urlCategory) {
          filtered = filtered.filter(match => 
            match.sportCategory === urlCategory
          );
        }
        setFilteredMatches(filtered);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [sportName, urlCategory]);

  // Extract unique categories for the current sport only
  const categories = ['All Categories', ...new Set(matches.map(match => match.sportCategory))];

  // Filter matches based on selected category
  useEffect(() => {
    let filtered = [...matches];
    
    if (selectedCategory !== 'All Categories') {
      filtered = filtered.filter(match => match.sportCategory === selectedCategory);
    }
    
    setFilteredMatches(filtered);
  }, [selectedCategory, matches]);

  // Group matches by status
  const upcomingMatches = filteredMatches.filter(match => match.matchStatus === 'upcoming');
  const ongoingMatches = filteredMatches.filter(match => match.matchStatus === 'ongoing');
  const completedMatches = filteredMatches.filter(match => match.matchStatus === 'completed');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-500';
      case 'ongoing':
        return 'bg-green-500';
      case 'completed':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const MatchCard = ({ match }: { match: matches }) => (
    <Card className="mb-4 hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="outline">{match.sportName}</Badge>
              <Badge variant="secondary">{match.sportCategory}</Badge>
              <span className={`inline-block w-2 h-2 rounded-full ${getStatusColor(match.matchStatus || '')}`} />
            </div>
          </div>
          <Badge className={`${getStatusColor(match.matchStatus || '')} text-white`}>
            {(match.matchStatus ?? '').charAt(0).toUpperCase() + (match.matchStatus ?? '').slice(1)}
          </Badge>
          <EditMatches match={match} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Teams/Participants Section */}
          <div className="flex items-center justify-between">
            <div className="flex-1 text-center">
              {match.teams?.length ? (
                <div className="flex items-center gap-2 justify-center">
                  <Users className="h-4 w-4" />
                  <div>
                    <span className="font-medium">{match.teams[0].name}</span>
                    <p className="text-sm text-muted-foreground">{match.teams[0].desasiswa}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 justify-center">
                  <User className="h-4 w-4" />
                  <div>
                    <span className="font-medium">{match.participants?.[0]?.name}</span>
                    <p className="text-sm text-muted-foreground">{match.participants?.[0]?.desasiswa}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="mx-4 text-xl font-bold text-muted-foreground">VS</div>
            <div className="flex-1 text-center">
              {match.teams?.length ? (
                <div className="flex items-center gap-2 justify-center">
                  <Users className="h-4 w-4" />
                  <div>
                    <span className="font-medium">{match.teams[1].name}</span>
                    <p className="text-sm text-muted-foreground">{match.teams[1].desasiswa}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 justify-center">
                  <User className="h-4 w-4" />
                  <div>
                    <span className="font-medium">{match.participants?.[1]?.name}</span>
                    <p className="text-sm text-muted-foreground">{match.participants?.[1]?.desasiswa}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Match Details */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {match.matchDate}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {match.matchTime}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {match.matchVenue}
            </div>
          </div>

          {match.matchStatus === 'completed' && match.matchScore && (
            <div className="flex items-center justify-center gap-2 pt-2 text-lg font-semibold">
              <Trophy className="h-5 w-5 text-yellow-500" />
              {match.matchScore}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-lg font-medium">Loading matches...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-lg font-medium text-red-500">Error: {error}</p>
          <p className="text-muted-foreground mt-2">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  // Add check for no matches for the current sport
  if (matches.length === 0) {
    return (
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {sportName?.charAt(0).toUpperCase()}{sportName?.slice(1)} Matches
          </h1>
        </div>
        
        <Card className="w-full p-8">
          <CardContent className="flex flex-col items-center justify-center space-y-4 pt-6">
            <div className="rounded-full bg-primary/10 p-6">
              <Calendar className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold text-center">No Matches Available</h2>
            <p className="text-muted-foreground text-center max-w-sm">
              There are currently no matches scheduled for {sportName}. Please check back later for updates.
            </p>
            <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Matches will be added soon</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {sportName?.charAt(0).toUpperCase()}{sportName?.slice(1)} Matches
        </h1>
        <p className="text-muted-foreground">
          {selectedCategory !== 'All Categories' 
            ? `Viewing ${selectedCategory} matches`
            : `View and track all ${sportName} matches`}
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2 bg-secondary/50 p-2 rounded-lg">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px] border-none bg-transparent">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="ongoing" className="space-y-4">
        <TabsList>
          <TabsTrigger value="ongoing" className="flex gap-2">
            Ongoing
            <Badge variant="secondary">{ongoingMatches.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="flex gap-2">
            Upcoming
            <Badge variant="secondary">{upcomingMatches.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex gap-2">
            Completed
            <Badge variant="secondary">{completedMatches.length}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ongoing">
          <ScrollArea className="h-[600px]">
            {ongoingMatches.length > 0 ? (
              ongoingMatches.map((match) => (
                <MatchCard key={match.matchID} match={match} />
              ))
            ) : (
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium">No ongoing matches</p>
                <p className="text-sm text-muted-foreground">Check back later for live matches</p>
              </div>
            )}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="upcoming">
          <ScrollArea className="h-[600px]">
            {upcomingMatches.length > 0 ? (
              upcomingMatches.map((match) => (
                <MatchCard key={match.matchID} match={match} />
              ))
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium">No upcoming matches</p>
                <p className="text-sm text-muted-foreground">Stay tuned for future match schedules</p>
              </div>
            )}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="completed">
          <ScrollArea className="h-[600px]">
            {completedMatches.length > 0 ? (
              completedMatches.map((match) => (
                <MatchCard key={match.matchID} match={match} />
              ))
            ) : (
              <div className="text-center py-8">
                <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium">No completed matches</p>
                <p className="text-sm text-muted-foreground">Match history will appear here</p>
              </div>
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MatchesPage;
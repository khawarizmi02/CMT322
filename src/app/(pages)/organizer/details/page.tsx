"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarDays, MapPin, Trophy, Clock, Filter } from 'lucide-react';
import { badmintonMatches, badmintonCategories, MatchType } from '@/data/mock-badminton';

const EventPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");

  const filterMatchesByCategory = (matches: MatchType[]) => {
    if (selectedCategory === "All Categories") return matches;
    return matches.filter(match => match.category === selectedCategory);
  };

  const currentMatches = filterMatchesByCategory(
    badmintonMatches.filter(match => match.status === 'ongoing')
  );
  const upcomingMatches = filterMatchesByCategory(
    badmintonMatches.filter(match => match.status === 'upcoming')
  );
  const pastMatches = filterMatchesByCategory(
    badmintonMatches.filter(match => match.status === 'completed')
  );

  const MatchCard = ({ match }: { match: MatchType }) => (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <Badge variant={
              match.status === 'ongoing' ? "destructive" :
              match.status === 'upcoming' ? "secondary" :
              "outline"
            }>
              {match.status.toUpperCase()}
            </Badge>
            <h3 className="mt-2 font-semibold">{match.category}</h3>
          </div>
          <div className="text-right text-sm text-muted-foreground">
            <div className="flex items-center justify-end gap-1">
              <CalendarDays className="h-4 w-4" />
              {match.date}
            </div>
            <div className="flex items-center justify-end gap-1 mt-1">
              <Clock className="h-4 w-4" />
              {match.time}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex-1">
            <p className="font-medium">{match.playerA}</p>
            <p className="text-sm text-muted-foreground">{match.desasiswaA}</p>
          </div>
          {match.status !== 'upcoming' && (
            <div className="px-4 py-2 bg-muted rounded-lg mx-4">
              <p className="text-xl font-bold text-center">
                {match.scoreA} - {match.scoreB}
              </p>
            </div>
          )}
          <div className="flex-1 text-right">
            <p className="font-medium">{match.playerB}</p>
            <p className="text-sm text-muted-foreground">{match.desasiswaB}</p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          {match.venue}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <Card className="mb-8">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-bold">Badminton</CardTitle>
              <Trophy className="h-6 w-6 text-yellow-500" />
            </CardHeader>
          </Card>

          <div className="flex items-center gap-2 mb-6">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {badmintonCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="current" className="space-y-4">
            <TabsList>
              <TabsTrigger value="current">Current Matches</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming Matches</TabsTrigger>
              <TabsTrigger value="past">Past Matches</TabsTrigger>
            </TabsList>

            <TabsContent value="current" className="space-y-4">
              {currentMatches.length > 0 ? (
                currentMatches.map(match => (
                  <MatchCard key={match.id} match={match} />
                ))
              ) : (
                <p className="text-center text-muted-foreground py-4">No current matches</p>
              )}
            </TabsContent>

            <TabsContent value="upcoming">
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-4">
                  {upcomingMatches.length > 0 ? (
                    upcomingMatches.map(match => (
                      <MatchCard key={match.id} match={match} />
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground py-4">No upcoming matches</p>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="past" className="space-y-4">
              {pastMatches.length > 0 ? (
                pastMatches.map(match => (
                  <MatchCard key={match.id} match={match} />
                ))
              ) : (
                <p className="text-center text-muted-foreground py-4">No past matches</p>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Side Image and Info */}
        <div className="hidden lg:block lg:w-1/3 p-6 space-y-6">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1721760886493-61c47c1caec9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Badminton" 
              className="w-full h-64 object-cover"
            />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">About Badminton</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Badminton events in SUKAD feature intense competitions across singles and doubles categories. 
                Matches are played at the USM Sports Complex, showcasing the best talent from each Desasiswa.
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Trophy className="h-4 w-4 text-yellow-500" />
                  <span>Previous Champion: Desasiswa Restu</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-red-500" />
                  <span>Venue: USM Sports Complex</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
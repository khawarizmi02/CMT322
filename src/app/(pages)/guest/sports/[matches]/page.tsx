'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
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
import { Button } from '@/components/ui/button';
import {
  CalendarDays,
  MapPin,
  Trophy,
  Clock,
  Filter,
  Edit,
  Plus,
} from 'lucide-react';
import {
  badmintonMatches,
  badmintonCategories,
  badmintonEventDetails,
  BadmintonMatchType,
} from '@/data/mock-badminton';
import {
  volleyballMatches,
  volleyballCategories,
  volleyballEventDetails,
  VolleyballMatchType,
} from '@/data/mock-volleyball';
import { set } from 'date-fns';

type SportConfig = {
  matches: any[];
  categories: string[];
  eventDetails: {
    title: string;
    about: string;
    image: string;
    venue: string;
    previousChampion: string;
  };
};

const SportConfigMap: { [key: string]: SportConfig } = {
  badminton: {
    matches: badmintonMatches,
    categories: [...badmintonCategories],
    eventDetails: badmintonEventDetails,
  },
  volleyball: {
    matches: volleyballMatches,
    categories: [...volleyballCategories],
    eventDetails: volleyballEventDetails,
  },
};

const EventPage = () => {
  const params = useParams();
  console.log('console matches:', params.matches);
  console.log('console sport:', params.sport);
  const router = useRouter();

  const [sportType, setSportType] = useState('volleyball');
  const [sportConfig, setSportConfig] = useState<SportConfig | null>(null);

  //Tukar SINI
  useEffect(() => {
    const newSportType = params.matches
      ? (params.matches as string).toLowerCase()
      : 'volleyball';
    
    // Validate that the sport type exists in SportConfigMap
    const validSportType = Object.keys(SportConfigMap).includes(newSportType)
      ? newSportType
      : 'volleyball';
    
    setSportType(validSportType);
    setSportConfig(SportConfigMap[validSportType]);
  }, [params.matches]);

  console.log('console SportType:', sportType);
  console.log('console SportConfig:', sportConfig);

  // const sportConfig = SportConfigMap[sportType];

  const [selectedCategory, setSelectedCategory] =
    useState<string>('All Categories');
  const [currentMatches, setCurrentMatches] = useState<any[]>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<any[]>([]);
  const [pastMatches, setPastMatches] = useState<any[]>([]);

  useEffect(() => {
    if (sportConfig) {
      const filterMatchesByCategory = (matches: any[]) => {
        if (selectedCategory === 'All Categories') return matches;
        return matches.filter((match) => match.category === selectedCategory);
      };

      setCurrentMatches(
        filterMatchesByCategory(
          sportConfig.matches.filter((match) => match.status === 'ongoing')
        )
      );
      setUpcomingMatches(
        filterMatchesByCategory(
          sportConfig.matches.filter((match) => match.status === 'upcoming')
        )
      );
      setPastMatches(
        filterMatchesByCategory(
          sportConfig.matches.filter((match) => match.status === 'completed')
        )
      );
    }
  }, [sportConfig, selectedCategory, params.sport]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing':
        return 'bg-green-500';
      case 'upcoming':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const MatchCard = ({ match }: { match: any }) => (
    <Card className="mb-4 hover:shadow-lg transition-shadow duration-200">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-opacity-10">
                  {match.category}
                </Badge>
                <span
                  className={`w-2 h-2 rounded-full ${getStatusColor(match.status)}`}
                />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold">
                {sportType === 'badminton' ? (
                  <span>
                    {match.playerA} vs {match.playerB}
                  </span>
                ) : (
                  <span>
                    {match.teamA} vs {match.teamB}
                  </span>
                )}
              </h3>
              <div className="text-sm font-medium text-muted-foreground">
                {match.desasiswaA} vs {match.desasiswaB}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <CalendarDays className="mr-2 h-4 w-4" />
                {match.date}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-2 h-4 w-4" />
                {match.time}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="mr-2 h-4 w-4" />
                {match.venue}
              </div>
              {match.status === 'completed' && (
                <div className="flex items-center text-sm font-medium">
                  <Trophy className="mr-2 h-4 w-4 text-yellow-500" />
                  {`${match.scoreA} - ${match.scoreB}`}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Badge
          variant="secondary"
          className={`${getStatusColor(match.status)} text-white`}
        >
          {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
        </Badge>
      </CardFooter>
    </Card>
  );

  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
      <div className="lg:w-2/3 p-6 space-y-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {sportConfig?.eventDetails.title}
            </h1>
            <p className="text-muted-foreground">
              Track all matches and results
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2 bg-secondary/50 p-2 rounded-lg">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-[180px] border-none bg-transparent">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {sportConfig?.categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="current" className="space-y-4">
          <TabsList className="w-full justify-start gap-2">
            <TabsTrigger value="current" className="flex-1">
              Current Matches
              <Badge variant="secondary" className="ml-2">
                {currentMatches.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="flex-1">
              Upcoming Matches
              <Badge variant="secondary" className="ml-2">
                {upcomingMatches.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="past" className="flex-1">
              Past Matches
              <Badge variant="secondary" className="ml-2">
                {pastMatches.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-4">
            <ScrollArea className="h-[600px] pr-4">
              {currentMatches.length > 0 ? (
                currentMatches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))
              ) : (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium">No current matches</p>
                  <p className="text-sm text-muted-foreground">
                    Check back later for live matches
                  </p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-4">
            <ScrollArea className="h-[600px] pr-4">
              {upcomingMatches.length > 0 ? (
                upcomingMatches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))
              ) : (
                <div className="text-center py-8">
                  <CalendarDays className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium">No upcoming matches</p>
                  <p className="text-sm text-muted-foreground">
                    Stay tuned for future match schedules
                  </p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            <ScrollArea className="h-[600px] pr-4">
              {pastMatches.length > 0 ? (
                pastMatches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))
              ) : (
                <div className="text-center py-8">
                  <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium">No past matches</p>
                  <p className="text-sm text-muted-foreground">
                    Match history will appear here
                  </p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>

      <div className="lg:w-1/3 p-6 space-y-6">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              About {sportConfig?.eventDetails.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <img
              src={sportConfig?.eventDetails.image}
              alt={sportConfig?.eventDetails.title}
              className="w-full h-48 object-cover rounded-lg mb-6"
            />
            <p className="text-muted-foreground mb-6">
              {sportConfig?.eventDetails.about}
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="text-sm font-medium">Previous Champion</p>
                  <p className="text-sm text-muted-foreground">
                    {sportConfig?.eventDetails.previousChampion}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                <MapPin className="h-5 w-5 text-red-500" />
                <div>
                  <p className="text-sm font-medium">Venue</p>
                  <p className="text-sm text-muted-foreground">
                    {sportConfig?.eventDetails.venue}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventPage;

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Trophy, 
  Medal, 
  Timer, 
  Dumbbell,
  Users,
  Target,
  CircleDot,
  Flag
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import firestore from '@/app/api/firebase/firestore';

type Sport = {
  sportID: string;
  sportName: string;
  sportCategory: string;
  phase: number;
};

export default function Sports() {
  const router = useRouter();
  const [sports, setSports] = useState<Sport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSports();
  }, []);

  const fetchSports = async () => {
    try {
      const sportsData = await firestore.readSportsData();
      setSports(sportsData);
      console.log('Sports data:', sportsData);
    } catch (err) {
      setError('Failed to fetch sports data');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getSportIcon = (sportName: string) => {
    const iconProps = { className: "w-6 h-6" };
    const lowercaseSport = sportName.toLowerCase();
    
    switch (true) {
      case lowercaseSport.includes('badminton'):
        return <Target {...iconProps} />; // Target icon for precision sports like badminton
      case lowercaseSport.includes('volleyball'):
        return <Users {...iconProps} />; // Users icon for team sports
      case lowercaseSport.includes('track'):
        return <Flag {...iconProps} />; // Flag for track events
      case lowercaseSport.includes('athletics'):
        return <CircleDot {...iconProps} />; // CircleDot for athletics
      default:
        return <Dumbbell {...iconProps} />; // Default sport icon
    }
  };

  const getPhaseIcon = (phase: number) => {
    switch (phase) {
      case 1:
        return <Trophy className="w-4 h-4" />;
      case 2:
        return <Medal className="w-4 h-4" />;
      case 3:
        return <Timer className="w-4 h-4" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#654321]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-96">
          <CardHeader>
            <CardTitle className="text-red-500">Error</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#654321] mb-2">SUKAD Sports Events</h1>
        <p className="text-gray-600">Explore sports events across all phases of the competition</p>
      </div>

      <Tabs defaultValue="1" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          {[1, 2, 3].map((phase) => (
            <TabsTrigger
              key={phase}
              value={phase.toString()}
              className="flex items-center gap-2"
            >
              {getPhaseIcon(phase)}
              Phase {phase}
            </TabsTrigger>
          ))}
        </TabsList>

        {[1, 2, 3].map((phase) => (
          <TabsContent key={phase} value={phase.toString()}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sports
                .filter(sport => sport.phase === phase)
                .map((sport) => (
                  <Card 
                    key={sport.sportID}
                    className="hover:shadow-lg transition-shadow cursor-pointer group"
                    onClick={() => router.push(`/organizer/sports/${sport.sportName.toLowerCase()}?category=${sport.sportCategory}`)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-full bg-[#654321]/10 group-hover:bg-[#654321]/20 transition-colors">
                            {getSportIcon(sport.sportName)}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{sport.sportName}</CardTitle>
                            <CardDescription className="text-sm font-medium text-gray-700">
                              {sport.sportCategory}
                            </CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
              ))}
              {sports.filter(sport => sport.phase === phase).length === 0 && (
                <Card className="col-span-full">
                  <CardHeader>
                    <CardTitle>No Sports Available</CardTitle>
                    <CardDescription>
                      There are currently no sports registered for Phase {phase}
                    </CardDescription>
                  </CardHeader>
                </Card>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
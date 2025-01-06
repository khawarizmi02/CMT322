'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { 
  Trophy, 
  Medal, 
  Timer, 
  Dumbbell,
  Users,
  Target,
  CircleDot,
  Flag,
  ChevronDown,
  ChevronUp
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
import { sports } from '@/data/type';
import AddSportsButton from '@/components/addSportsButton';
import DeleteSportButton from '@/components/deleteSportsButton';

export default function Sports() {
  const router = useRouter();
  const [sports, setSports] = useState<sports[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedSports, setExpandedSports] = useState<{ [key: string]: boolean }>({});
  const [activeTab, setActiveTab] = useState<string>('1');

  const { isSignedIn } = useUser();
  console.log(isSignedIn);
  
  useEffect(() => {
    fetchSports();
  }, []);


  const fetchSports = async () => {
    try {
      const sportsData = await firestore.readSportsData();
      setSports(sportsData);
      // Initialize expanded state for all sports
      const initialExpandedState: { [key: string]: boolean } = {};
      sportsData.forEach(sport => {
        initialExpandedState[sport.sportName] = true;  // Start expanded
      });
      setExpandedSports(initialExpandedState);
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
        return <Target {...iconProps} />;
      case lowercaseSport.includes('volleyball'):
        return <Users {...iconProps} />;
      case lowercaseSport.includes('track'):
        return <Flag {...iconProps} />;
      case lowercaseSport.includes('athletics'):
        return <CircleDot {...iconProps} />;
      default:
        return <Dumbbell {...iconProps} />;
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

  const toggleSportExpansion = (sportName: string) => {
    setExpandedSports(prev => ({
      ...prev,
      [sportName]: !prev[sportName]
    }));
  };

  const groupSportsByName = (phase: number) => {
    const phaseSports = sports.filter(sport => sport.phase === phase);
    const grouped = phaseSports.reduce((acc, sport) => {
      if (!acc[sport.sportName]) {
        acc[sport.sportName] = [];
      }
      acc[sport.sportName].push(sport);
      return acc;
    }, {} as { [key: string]: sports[] });
    return grouped;
  };

  const handleAddSport = async (sportData: Omit<sports, 'sportID'>) => {
    try {
      await firestore.addSportsData(sportData);
      fetchSports();
    } catch (error) {
      setError('Failed to add sport');
      console.error('Error:', error);
    }
  };

  const handleDeleteSport = async (sportID: string) => {
    try {
      await firestore.deleteSportsData(sportID);
      fetchSports(); // Refresh the list after deletion
    } catch (error) {
      setError('Failed to delete sport');
      console.error('Error:', error);
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
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#654321] mb-2">SUKAD Sports Events</h1>
          <p className="text-gray-600">Explore sports events across all phases of the competition</p>
        </div>
        {isSignedIn && (
          <AddSportsButton 
            currentPhase={parseInt(activeTab)} 
            onAddSport={handleAddSport} 
          />
        )}
      </div>

      <Tabs defaultValue="1" className="w-full" value={activeTab} onValueChange={setActiveTab}>
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
            <div className="grid grid-cols-1 gap-6">
              {Object.entries(groupSportsByName(phase)).map(([sportName, sportCategories]) => (
                <Card key={sportName} className="overflow-hidden">
                  <CardHeader 
                    className="cursor-pointer bg-[#654321]/5 hover:bg-[#654321]/10"
                    onClick={() => toggleSportExpansion(sportName)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-[#654321]/10">
                          {getSportIcon(sportName)}
                        </div>
                        <CardTitle className="text-xl">{sportName}</CardTitle>
                        <span className="text-sm text-gray-600">
                          ({sportCategories.length} {sportCategories.length === 1 ? 'category' : 'categories'})
                        </span>
                      </div>
                      {expandedSports[sportName] ? <ChevronUp /> : <ChevronDown />}
                    </div>
                  </CardHeader>
                  {expandedSports[sportName] && (
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                      {sportCategories.map((sport) => (
                        <div
                          key={sport.sportID}
                          className="p-4 rounded-lg border border-gray-200 hover:border-[#654321] hover:shadow-md transition-all cursor-pointer relative"
                        >
                          <div
                            onClick={() => router.push(`/organizer/sports/${sport.sportName.toLowerCase()}?category=${sport.sportCategory}`)}
                          >
                            <h3 className="font-medium text-lg text-[#654321] pr-8">{sport.sportCategory}</h3>
                            <p className="text-sm text-gray-600">Click to view details</p>
                          </div>
                          {sport.sportID && isSignedIn && (
                            <DeleteSportButton
                              sportID={sport.sportID}
                              sportCategory={sport.sportCategory}
                              onDelete={handleDeleteSport}
                            />
                          )}
                        </div>
                      ))}
                    </CardContent>
                  )}
                </Card>
              ))}
              {Object.keys(groupSportsByName(phase)).length === 0 && (
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
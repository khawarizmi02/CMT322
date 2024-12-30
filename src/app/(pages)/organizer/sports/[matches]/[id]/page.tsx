"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Save, User, Users, MapPin, Calendar, Clock, Trophy, Home } from 'lucide-react';
import { badmintonMatches, BadmintonMatchType } from '@/data/mock-badminton';
import { volleyballMatches, VolleyballMatchType } from '@/data/mock-volleyball';
import { Alert, AlertDescription } from "@/components/ui/alert";

type MatchType = BadmintonMatchType | VolleyballMatchType;

interface PageProps {
  params: { id: string };
  searchParams: { type: string };
}

const EditMatchPage = ({ params, searchParams }: PageProps) => {
  const router = useRouter();
  const [match, setMatch] = useState<MatchType | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    playerA: '',
    playerB: '',
    teamA: '',
    teamB: '',
    desasiswaA: '',
    desasiswaB: '',
    venue: '',
    date: '',
    time: '',
    scoreA: '',
    scoreB: '',
  });
	const [isBadminton, setIsBadminton] = useState('badminton');

  useEffect(() => {
		setIsBadminton(searchParams.type)
    const matches = searchParams.type === 'badminton' ? badmintonMatches : volleyballMatches;
    const foundMatch = matches.find(m => m.id === params.id);
    if (foundMatch) {
      setMatch(foundMatch);
      setFormData({
        playerA: (foundMatch as BadmintonMatchType).playerA || '',
        playerB: (foundMatch as BadmintonMatchType).playerB || '',
        teamA: (foundMatch as VolleyballMatchType).teamA || '',
        teamB: (foundMatch as VolleyballMatchType).teamB || '',
        desasiswaA: foundMatch.desasiswaA,
        desasiswaB: foundMatch.desasiswaB,
        venue: foundMatch.venue,
        date: foundMatch.date,
        time: foundMatch.time,
        scoreA: foundMatch.scoreA?.toString() || '',
        scoreB: foundMatch.scoreB?.toString() || '',
      });
    }
    setLoading(false);
  }, [params.id, searchParams.type]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically make an API call to update the match
    // For now, we'll just simulate the update
    
    // If scores are added to a current match, update its status to completed
    if (match?.status === 'ongoing' && formData.scoreA && formData.scoreB) {
      // Update match status to completed
      console.log('Match completed with scores:', formData.scoreA, formData.scoreB);
    }

    router.push('/organizer/details');
    router.refresh();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="space-y-4 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
          <p className="text-muted-foreground">Loading match details...</p>
        </div>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Alert variant="destructive" className="max-w-md">
          <AlertDescription>
            Match not found. Please check the URL and try again.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-2 hover:bg-background/60"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Matches
          </Button>
          <Badge variant="outline" className="text-sm">
            {isBadminton ? 'Badminton' : 'Volleyball'} Match
          </Badge>
        </div>

        <Card className="border-muted/40 shadow-lg">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl font-bold">Edit Match Details</CardTitle>
            <CardDescription>
              Update match information and scores for {match.status === 'ongoing' ? 'the ongoing match' : 'this match'}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                {/* Players/Teams Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-lg font-semibold text-primary">
                    {isBadminton ? <User className="h-5 w-5" /> : <Users className="h-5 w-5" />}
                    <h3>{isBadminton ? 'Players' : 'Teams'}</h3>
                  </div>
                  <Separator className="my-4" />
                  
                  {isBadminton ? (
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="playerA" className="text-sm font-medium">
                          Player A
                        </Label>
                        <Input
                          id="playerA"
                          value={formData.playerA}
                          onChange={(e) => handleInputChange('playerA', e.target.value)}
                          className="bg-background/50 focus:bg-background"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="playerB" className="text-sm font-medium">
                          Player B
                        </Label>
                        <Input
                          id="playerB"
                          value={formData.playerB}
                          onChange={(e) => handleInputChange('playerB', e.target.value)}
                          className="bg-background/50 focus:bg-background"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="teamA" className="text-sm font-medium">
                          Team A
                        </Label>
                        <Input
                          id="teamA"
                          value={formData.teamA}
                          onChange={(e) => handleInputChange('teamA', e.target.value)}
                          className="bg-background/50 focus:bg-background"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="teamB" className="text-sm font-medium">
                          Team B
                        </Label>
                        <Input
                          id="teamB"
                          value={formData.teamB}
                          onChange={(e) => handleInputChange('teamB', e.target.value)}
                          className="bg-background/50 focus:bg-background"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Desasiswa Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-lg font-semibold text-primary">
                    <Home className="h-5 w-5" />
                    <h3>Desasiswa</h3>
                  </div>
                  <Separator className="my-4" />
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="desasiswaA" className="text-sm font-medium">
                        Desasiswa A
                      </Label>
                      <Input
                        id="desasiswaA"
                        value={formData.desasiswaA}
                        onChange={(e) => handleInputChange('desasiswaA', e.target.value)}
                        className="bg-background/50 focus:bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="desasiswaB" className="text-sm font-medium">
                        Desasiswa B
                      </Label>
                      <Input
                        id="desasiswaB"
                        value={formData.desasiswaB}
                        onChange={(e) => handleInputChange('desasiswaB', e.target.value)}
                        className="bg-background/50 focus:bg-background"
                      />
                    </div>
                  </div>
                </div>

                {/* Match Details Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-lg font-semibold text-primary">
                    <Calendar className="h-5 w-5" />
                    <h3>Match Details</h3>
                  </div>
                  <Separator className="my-4" />
                  
                  <div className="grid grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="date" className="text-sm font-medium">
                        Date
                      </Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="date"
                          type="date"
                          value={formData.date}
                          onChange={(e) => handleInputChange('date', e.target.value)}
                          className="pl-10 bg-background/50 focus:bg-background"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time" className="text-sm font-medium">
                        Time
                      </Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="time"
                          type="time"
                          value={formData.time}
                          onChange={(e) => handleInputChange('time', e.target.value)}
                          className="pl-10 bg-background/50 focus:bg-background"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="venue" className="text-sm font-medium">
                        Venue
                      </Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="venue"
                          value={formData.venue}
                          onChange={(e) => handleInputChange('venue', e.target.value)}
                          className="pl-10 bg-background/50 focus:bg-background"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Score Section - Only for ongoing matches */}
                {match.status === 'ongoing' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-lg font-semibold text-primary">
                      <Trophy className="h-5 w-5" />
                      <h3>Match Score</h3>
                    </div>
                    <Separator className="my-4" />
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="scoreA" className="text-sm font-medium">
                          Score A
                        </Label>
                        <Input
                          id="scoreA"
                          type="number"
                          value={formData.scoreA}
                          onChange={(e) => handleInputChange('scoreA', e.target.value)}
                          className="bg-background/50 focus:bg-background"
                          min="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="scoreB" className="text-sm font-medium">
                          Score B
                        </Label>
                        <Input
                          id="scoreB"
                          type="number"
                          value={formData.scoreB}
                          onChange={(e) => handleInputChange('scoreB', e.target.value)}
                          className="bg-background/50 focus:bg-background"
                          min="0"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="hover:bg-destructive/10"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="bg-primary hover:bg-primary/90"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditMatchPage;
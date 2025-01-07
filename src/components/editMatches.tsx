import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Edit2 } from "lucide-react";
import { matches } from "@/data/type/index";

interface MatchEditDialogProps {
  match: matches;
}

const EditMatches: React.FC<MatchEditDialogProps> = ({ match }) => {
  const [matchStatus, setMatchStatus] = React.useState(match.matchStatus);
  const [score, setScore] = React.useState(match.matchScore || '');
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // TODO: Implement Firebase update function
      // await firestore.updateMatch(match.matchID, {
      //   matchStatus,
      //   matchScore: score,
      // });
      
      console.log('Match updated:', {
        matchID: match.matchID,
        matchStatus,
        matchScore: score,
      });
      
      setIsOpen(false);
    } catch (error) {
      console.error('Error updating match:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Edit2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Match Details</DialogTitle>
          <DialogDescription>
            Update the match status and score. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="status" className="text-sm font-medium">
              Match Status
            </label>
            <Select
              value={matchStatus}
              onValueChange={(value) => setMatchStatus(value as "upcoming" | "ongoing" | "completed")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="score" className="text-sm font-medium">
              Score
            </label>
            <Input
              id="score"
              placeholder="Enter score (e.g., 2-1)"
              value={score}
              onChange={(e) => setScore(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMatches;
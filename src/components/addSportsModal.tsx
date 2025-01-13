import React, { useState } from "react";
import {sports} from "@/data/type/index";
import { Trash, Plus, X, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Card,
  CardContent
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AddSportModalProps {
  existingSports: sports[];
  onClose: () => void;
  onAddSport: (newSport: sports) => void;
  onDeleteSport: (sportID: string) => void;
}

const AddSportModal: React.FC<AddSportModalProps> = ({
  existingSports,
  onClose,
  onAddSport,
  onDeleteSport,
}) => {
  const [sportName, setSportName] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleAddSport = () => {
    if (!sportName.trim()) {
      setError("Sport name cannot be empty.");
      return;
    }

    const isDuplicate = existingSports.some(
      (sport) => sport.sportName.toLowerCase() === sportName.trim().toLowerCase()
    );
    if (isDuplicate) {
      setError("This sport already exists.");
      return;
    }

    onAddSport({ sportName: sportName.trim() });
    setError("");
    setSportName("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddSport();
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Manage Sports</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Add New Sport Section */}
          <div className="space-y-4">
            <div className="flex space-x-2">
              <Input
                value={sportName}
                onChange={(e) => setSportName(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter sport name"
                className="flex-1"
              />
              <Button onClick={handleAddSport} size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {error && (
              <Alert variant="destructive" className="py-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>

          {/* Existing Sports List */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Existing Sports</h3>
            <ScrollArea className="h-[200px] rounded-md border">
              {existingSports.length === 0 ? (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  No sports available.
                </div>
              ) : (
                <div className="space-y-2 p-4">
                  {existingSports.map((sport) => (
                    <Card key={sport.sportID} className="group relative">
                      <CardContent className="p-3 flex items-center justify-between">
                        <span className="text-sm">{sport.sportName}</span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => sport.sportID && onDeleteSport(sport.sportID)}
                            >
                              <Trash className="h-4 w-4 text-destructive" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Delete sport</p>
                          </TooltipContent>
                        </Tooltip>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddSportModal;
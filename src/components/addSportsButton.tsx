'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import {
  SPORTS_LIST,
  BADMINTON_CATEGORIES,
  TRACKS_CATEGORIES,
  VOLLEYBALL_CATEGORIES,
  sports,
} from '@/data/type';

const getSportCategories = (sportName: string) => {
  switch (sportName) {
    case 'Badminton':
      return BADMINTON_CATEGORIES;
    case 'Track':
      return TRACKS_CATEGORIES;
    case 'Volleyball':
      return VOLLEYBALL_CATEGORIES;
    default:
      return [];
  }
};

interface AddSportsButtonProps {
  currentPhase: number;
  onAddSport: (sport: Omit<sports, 'sportID'>) => void;
}

const AddSportsButton = ({
  currentPhase,
  onAddSport,
}: AddSportsButtonProps) => {
  const [selectedSport, setSelectedSport] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    if (selectedSport && selectedCategory) {
      onAddSport({
        sportName: selectedSport,
      });
      setOpen(false);
      setSelectedSport('');
      setSelectedCategory('');
    }
  };

  const currentCategories = selectedSport
    ? getSportCategories(selectedSport)
    : [];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mb-6 bg-[#654321] hover:bg-[#654321]/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Sports
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Sport</DialogTitle>
          <DialogDescription>
            Select a sport and category to add to Phase {currentPhase}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="sport">Sport</Label>
            <Select value={selectedSport} onValueChange={setSelectedSport}>
              <SelectTrigger id="sport">
                <SelectValue placeholder="Select a sport" />
              </SelectTrigger>
              <SelectContent>
                {SPORTS_LIST.map((sport) => (
                  <SelectItem key={sport} value={sport}>
                    {sport}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
              disabled={!selectedSport}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {currentCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!selectedSport || !selectedCategory}
            className="bg-[#654321] hover:bg-[#654321]/90"
          >
            Add Sport
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddSportsButton;

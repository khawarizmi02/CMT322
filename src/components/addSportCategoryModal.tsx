import React, { useState } from "react";
import { sports, sportCategory } from "@/data/type/index";
import { AlertCircle, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert";
import { Label } from "@/components/ui/label";

interface SportCategoryModalProps {
  existingSports: sports[];
  existingCategories: sportCategory[];
  onClose: () => void;
  onAddCategory: (newCategory: sportCategory, sportID: string) => void;
}

const AddSportCategoryModal: React.FC<SportCategoryModalProps> = ({
  existingSports,
  existingCategories,
  onClose,
  onAddCategory,
}) => {
  const [selectedSportID, setSelectedSportID] = useState<string>("");
  const [categoryName, setCategoryName] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleAddCategory = () => {
    if (!selectedSportID) {
      setError("Please select a sport.");
      return;
    }

    if (!categoryName.trim()) {
      setError("Category name cannot be empty.");
      return;
    }

    const isDuplicate = existingCategories.some(
      (category) =>
        category.sportID === selectedSportID &&
        category.sportCategoryName.toLowerCase() === categoryName.trim().toLowerCase()
    );

    if (isDuplicate) {
      setError("This category already exists for the selected sport.");
      return;
    }

    onAddCategory(
      {
        sportCategoryName: categoryName.trim(),
        sportID: selectedSportID,
      } as sportCategory,
      selectedSportID
    );

    setError("");
    onClose();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddCategory();
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Sport Category
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sport">Select Sport</Label>
              <Select
                value={selectedSportID}
                onValueChange={setSelectedSportID}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a sport" />
                </SelectTrigger>
                <SelectContent>
                  {existingSports.map((sport) => (
                    <SelectItem key={sport.sportID} value={sport.sportID || ""}>
                      {sport.sportName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category Name</Label>
              <Input
                id="category"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter category name"
              />
            </div>

            {error && (
              <Alert variant="destructive" className="py-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>
        </div>

        <DialogFooter>
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddCategory}
            >
              Add Category
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddSportCategoryModal;
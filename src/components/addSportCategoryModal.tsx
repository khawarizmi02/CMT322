import React, { useState, useRef } from "react";
import { sports, sportCategory } from "@/data/type/index";
import { AlertCircle, Plus, ImagePlus, X } from "lucide-react";
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
  onAddCategory: (newCategory: sportCategory, sportID: string, imageFile?: File) => void;
}

const AddSportCategoryModal: React.FC<SportCategoryModalProps> = ({
  existingSports,
  existingCategories,
  onClose,
  onAddCategory,
}) => {
  const [selectedSportID, setSelectedSportID] = useState<string>("");
  const [categoryName, setCategoryName] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setError("Invalid file type. Please upload JPEG, PNG, GIF, or WebP images.");
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setError("File size exceeds 5MB. Please choose a smaller image.");
      return;
    }

    setImageFile(file);
    setError("");
  };

  const removeImage = () => {
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

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
      selectedSportID,
      imageFile || undefined
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

            <div className="space-y-2">
              <Label>Category Image (Optional)</Label>
              <div className="flex items-center gap-2">
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="imageUpload"
                />
                <Label 
                  htmlFor="imageUpload" 
                  className="flex items-center gap-2 cursor-pointer border p-2 rounded hover:bg-gray-100"
                >
                  <ImagePlus className="h-5 w-5" />
                  Upload Image
                </Label>
                {imageFile && (
                  <div className="flex items-center gap-2">
                    <span>{imageFile.name}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={removeImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
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
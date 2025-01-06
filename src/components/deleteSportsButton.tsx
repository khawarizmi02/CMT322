import React, { useState } from 'react';
import { Trash2, X } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface DeleteSportButtonProps {
  sportID: string;
  sportCategory: string;
  onDelete: (sportID: string) => Promise<void>;
}

const DeleteSportButton = ({ sportID, sportCategory, onDelete }: DeleteSportButtonProps) => {
  const [showAlert, setShowAlert] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(sportID);
      setShowAlert(false);
    } catch (error) {
      console.error('Error deleting sport:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (showAlert) {
    return (
      <Alert className="absolute top-0 right-0 left-0 z-10 bg-white border-red-200">
        <div className="flex justify-between items-start">
          <div>
            <AlertTitle>Delete Sport Category</AlertTitle>
            <AlertDescription>
              Are you sure you want to delete {sportCategory}?
            </AlertDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 hover:bg-red-100"
            onClick={() => setShowAlert(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-2 mt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAlert(false)}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </Alert>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="absolute top-2 right-2 h-8 w-8 hover:bg-red-100 hover:text-red-600"
      onClick={() => setShowAlert(true)}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
};

export default DeleteSportButton;
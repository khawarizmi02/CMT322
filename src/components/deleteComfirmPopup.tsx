import { X } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

const DeleteConfirmPopup = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    itemType, 
    itemName 
  }: { 
    isOpen: boolean; 
    onClose: () => void; 
    onConfirm: () => void; 
    itemType: string;
    itemName: string;
  }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-background rounded-lg p-6 max-w-md w-full mx-4 shadow-lg" onClick={e => e.stopPropagation()}>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold">Confirm Deletion</h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <Alert variant="destructive">
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                Are you sure you want to delete {itemType} "{itemName}"? 
                This action cannot be undone.
              </AlertDescription>
            </Alert>
  
            <div className="flex gap-2 justify-end mt-2">
              <Button
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default DeleteConfirmPopup;
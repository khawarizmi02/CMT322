import React, { useState } from "react";
import { sports } from "@/data/type/index";

interface AddSportModalProps {
  existingSports: sports[]; // Pass the list of existing sports for validation
  onClose: () => void;
  onAddSport: (newSport: sports) => void; // Callback to handle adding the new sport
}

const AddSportModal: React.FC<AddSportModalProps> = ({
  existingSports,
  onClose,
  onAddSport,
}) => {
  const [sportName, setSportName] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleAddSport = () => {
    // Validation: Ensure sport name is unique and not empty
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

    // Pass the new sport to the parent component
    onAddSport({ sportName: sportName.trim() });
    setError(""); // Clear error
    onClose(); // Close the modal
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add New Sport</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Sport Name</label>
          <input
            type="text"
            value={sportName}
            onChange={(e) => setSportName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleAddSport}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Add Sport
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSportModal;
import React, { useState } from "react";
import { sports, sportCategory } from "@/data/type/index";

interface SportCategoryModalProps {
  existingSports: sports[]; // List of existing unique sports with their IDs
  existingCategories: sportCategory[]; // List of existing categories for validation
  onClose: () => void; // Close the modal
  onAddCategory: (newCategory: sportCategory, sportID: string) => void; // Callback to add a new category
}

const AddSportCategoryModal: React.FC<SportCategoryModalProps> = ({
  existingSports,
  existingCategories,
  onClose,
  onAddCategory,
}) => {
  const [selectedSportID, setSelectedSportID] = useState<string>(""); // Selected sport ID
  const [categoryName, setCategoryName] = useState<string>(""); // New category name
  const [error, setError] = useState<string>(""); // Validation error

  const handleAddCategory = () => {
    // Validate input
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

    // Pass the new category to the parent component
    onAddCategory(
      {
        sportCategoryName: categoryName.trim(),
        sportID: selectedSportID,
      } as sportCategory,
      selectedSportID
    );

    setError(""); // Clear error
    onClose(); // Close modal
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add New Sport Category</h2>

        {/* Sport Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Select Sport</label>
          <select
            value={selectedSportID}
            onChange={(e) => setSelectedSportID(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="" disabled>
              -- Select a sport --
            </option>
            {existingSports.map((sport) => (
              <option key={sport.sportID} value={sport.sportID}>
                {sport.sportName}
              </option>
            ))}
          </select>
        </div>

        {/* Category Name Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Category Name</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleAddCategory}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Add Category
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSportCategoryModal;

'use client';

import React, { useEffect, useState } from "react";
import { Loader, Trash } from "lucide-react";
import { sports, sportCategory } from "@/data/type/index";
import AddSportsModal from "@/components/addSportsModal";
import AddSportCategoryModal from "@/components/addSportCategoryModal";
import { useUser } from "@clerk/nextjs";

const SportPage = () => {
  const [sportCategories, setSportCategories] = useState<sportCategory[]>([]);
  const [sportsList, setSportsList] = useState<sports[]>([]);
  const [showSportModal, setShowSportModal] = useState<boolean>(false);
  const [showCategoryModal, setShowCategoryModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const { isSignedIn } = useUser();

  const readSportCategory = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/organizer/sport-page", {
        method: "GET",
      });
      const data = await response.json();
      setSportCategories(data.sportCategory);
    } catch (error) {
      console.error("Error reading sport categories:", error);
    }
    readUniqueSport();
    setLoading(false);
  };

  const readUniqueSport = async () => {
    try {
      // Read all sports available first
      const response = await fetch("/api/organizer/sports", {
        method: "GET",
      });
      const data = await response.json();
      // Get unique sports
      const uniqueSports = data.sports.filter((sport: sports, index: number, self: sports[]) =>
        index === self.findIndex((t) => t.sportName === sport.sportName)
      );
      console.log(uniqueSports);
      setSportsList(uniqueSports);
    } catch (error) {
      console.error("Error reading sports:", error);
    }
  };

  const handleAddSport = async (newSport: sports) => {
    try {
      const response = await fetch("/api/organizer/sports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSport),
      });

      if (!response.ok) {
        throw new Error("Failed to create sport");
      }
      if (response.ok) {
        alert("New sport added successfully!");
        readSportCategory(); // Refresh the sport categories list
      } else {
        alert("Failed to add new sport.");
      }
    } catch (error) {
      console.error("Error adding new sport:", error);
    }
  };

  const handleAddSportCategory = async (newSportCategory: sportCategory, sportID: string) => {
    try {
      const response = await fetch(`/api/organizer/sport-category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Add the sport ID to the request body
        body: JSON.stringify({ newSportCategory, sportID }),
      });

      if (!response.ok) {
        throw new Error("Failed to add sport category");
      }
      if (response.ok) {
        alert("New sport category added successfully!");
        readSportCategory(); // Refresh the sport categories list
      } else {
        alert("Failed to add new sport category.");
      }
    } catch (error) {
      console.error("Error adding new sport category:", error);
    }
  };

  const handleDeleteSportCategory = async (sportCategoryID: string) => {
    try {
      const response = await fetch(`/api/organizer/sport-category`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sportCategoryID }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete sport");
      }
      if (response.ok) {
        alert("Sport category deleted successfully!");
        readSportCategory(); // Refresh the sport categories list
      } else {
        alert("Failed to delete sport category.");
      }
    } catch (error) {
      console.error("Error deleting sport category:", error);
    }
  };

  useEffect(() => {
    readSportCategory();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin text-gray-600" />
      </div>
    );
  }

  // Group sport categories by sport name
  const groupedCategories = sportCategories.reduce((groups, category) => {
    const sportName = category.sportName || "Unknown Sport";
    if (!groups[sportName]) {
      groups[sportName] = [];
    }
    groups[sportName].push(category);
    return groups;
  }, {} as Record<string, sportCategory[]>);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Sport Categories</h1>
      <div className="flex justify-end mb-4">
        {isSignedIn && (
          <>
            <button
              onClick={() => setShowSportModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Add New Sport
            </button>
            <button
              onClick={() => setShowCategoryModal(true)}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Add New Category
            </button>
          </>
        )}
      </div>
      {Object.keys(groupedCategories).length === 0 ? (
        <p className="text-center text-gray-500">No sport categories found.</p>
      ) : (
        <div>
          {Object.entries(groupedCategories).map(([sportName, categories]) => (
            <div key={sportName} className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">{sportName}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                  <div
                    key={category.sportCategoryID}
                    className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    {category.imageUrl && (
                      <img
                        src={category.imageUrl}
                        alt={category.sportCategoryName}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-semibold">
                          {category.sportCategoryName}
                        </h3>
                        {isSignedIn && (
                          <button
                            onClick={() => category.sportCategoryID && handleDeleteSportCategory(category.sportCategoryID)}
                            className="text-red-600 hover:text-red-800 transition"
                          >
                            <Trash className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                      <div className="text-sm text-gray-500 mb-4">
                        <p>
                          🥇 Gold: {category.goldMedal ? category.goldMedal : "Not yet determined"}
                        </p>
                        <p>
                          🥈 Silver: {category.silverMedal ? category.silverMedal : "Not yet determined"}
                        </p>
                        <p>
                          🥉 Bronze: {category.bronzeMedal ? category.bronzeMedal : "Not yet determined"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Sport Modal */}
      {showSportModal && (
        <AddSportsModal
          existingSports={sportsList}
          onClose={() => setShowSportModal(false)}
          onAddSport={handleAddSport}
        />
      )}

      {/* Add Category Modal */}
      {showCategoryModal && (
        <AddSportCategoryModal
          existingSports={sportsList}
          existingCategories={sportCategories}
          onClose={() => setShowCategoryModal(false)}
          onAddCategory={handleAddSportCategory}
        />
      )}
    </div>
  );
};

export default SportPage;

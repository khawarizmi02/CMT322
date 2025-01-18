'use client';

import React, { useEffect, useState } from 'react';
import {
  Loader,
  Plus,
  Trophy,
  Medal,
  Trash,
  Award,
  Activity,
  X,
} from 'lucide-react';
import { sports, sportCategory } from '@/data/type/index';
import AddSportsModal from '@/components/addSportsModal';
import AddSportCategoryModal from '@/components/addSportCategoryModal';
import { useUser } from '@clerk/nextjs';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import DeleteConfirmPopup from '@/components/deleteComfirmPopup';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const SportPage = () => {
  const router = useRouter();

  const handleViewMatch = (sportCategoryId: string) => {
    router.push(`/sports/matches?sportCategoryID=${sportCategoryId}`);
  };

  const [sportCategories, setSportCategories] = useState<sportCategory[]>([]);
  const [sportsList, setSportsList] = useState<sports[]>([]);
  const [showSportModal, setShowSportModal] = useState<boolean>(false);
  const [showCategoryModal, setShowCategoryModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    show: boolean;
    id: string | null;
    type: 'sport' | 'category';
    name: string;
  }>({
    show: false,
    id: null,
    type: 'sport',
    name: '',
  });

  const { isSignedIn } = useUser();

  const readSportCategory = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/sport-page', {
        method: 'GET',
      });
      const data = await response.json();
      setSportCategories(data.sportCategory);
    } catch (error) {
      console.error('Error reading sport categories:', error);
    }
    readUniqueSport();
    setLoading(false);
  };

  const readUniqueSport = async () => {
    try {
      // Read all sports available first
      const response = await fetch('/api/sports', {
        method: 'GET',
      });
      const data = await response.json();
      // Get unique sports
      const uniqueSports = data.sports.filter(
        (sport: sports, index: number, self: sports[]) =>
          index === self.findIndex((t) => t.sportName === sport.sportName)
      );
      console.log(uniqueSports);
      setSportsList(uniqueSports);
    } catch (error) {
      console.error('Error reading sports:', error);
    }
  };

  const handleAddSport = async (newSport: sports) => {
    try {
      const response = await fetch('/api/sports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSport),
      });

      if (!response.ok) {
        throw new Error('Failed to create sport');
      }
      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Sport has been created successfully',
        });
        readSportCategory(); // Refresh the sport categories list
      } else {
        alert('Failed to add new sport.');
      }
    } catch (error) {
      console.error('Error adding new sport:', error);
    }
  };

  const handleAddSportCategory = async (
    newSportCategory: sportCategory,
    sportID: string
  ) => {
    try {
      const response = await fetch(`/api/sport-category`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Add the sport ID to the request body
        body: JSON.stringify({ newSportCategory, sportID }),
      });

      if (!response.ok) {
        throw new Error('Failed to add sport category');
      }
      if (response.ok) {
        toast({
          title: 'Success',
          description: 'New sport category added successfully!',
        });
        readSportCategory(); // Refresh the sport categories list
      } else {
        alert('Failed to add new sport category.');
      }
    } catch (error) {
      console.error('Error adding new sport category:', error);
    }
  };

  const handleDeleteSportCategory = async (sportCategoryID: string) => {
    try {
      const response = await fetch(`/api/sport-category`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sportCategoryID }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete sport');
      }
      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Sport category deleted successfully!',
        });
        readSportCategory(); // Refresh the sport categories list
      } else {
        alert('Failed to delete sport category.');
      }
    } catch (error) {
      console.error('Error deleting sport category:', error);
    }
  };

  const handleDeleteSport = async (sportID: string) => {
    try {
      const response = await fetch(`/api/sports`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sportID }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete sport');
      }
      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Sport deleted successfully!',
        });
        readSportCategory(); // Refresh the sport categories list
      } else {
        alert('Failed to delete sport.');
      }
    } catch (error) {
      console.error('Error deleting sport:', error);
    }
  };

  useEffect(() => {
    readSportCategory();
  }, []);

  const confirmDelete = (
    id: string,
    type: 'sport' | 'category',
    name: string
  ) => {
    setDeleteConfirm({ show: true, id, type, name });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm.id) return;

    if (deleteConfirm.type === 'sport') {
      await handleDeleteSport(deleteConfirm.id);
    } else {
      await handleDeleteSportCategory(deleteConfirm.id);
    }

    setDeleteConfirm({ show: false, id: null, type: 'sport', name: '' });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <Loader className="w-12 h-12 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading sports data...</p>
      </div>
    );
  }

  // Group sport categories by sport name
  const groupedCategories = sportCategories.reduce(
    (groups, category) => {
      const sportName = category.sportName || 'Unknown Sport';
      if (!groups[sportName]) {
        groups[sportName] = [];
      }
      groups[sportName].push(category);
      return groups;
    },
    {} as Record<string, sportCategory[]>
  );

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight">
            Sports Management
          </h1>
          <p className="text-muted-foreground">
            Manage sports categories and medal assignments
          </p>
        </div>
        {isSignedIn && (
          <div className="flex gap-3">
            <Button
              onClick={() => setShowSportModal(true)}
              variant="default"
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              Sport Management
            </Button>
            <Button
              onClick={() => setShowCategoryModal(true)}
              variant="secondary"
              className="gap-2"
            >
              <Trophy className="w-4 h-4" />
              Add Category
            </Button>
          </div>
        )}
      </div>

      {Object.keys(groupedCategories).length === 0 ? (
        <Card className="w-full">
          <CardContent className="flex flex-col items-center justify-center h-64">
            <Activity className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-xl text-muted-foreground">
              No sport categories found
            </p>
            {isSignedIn && (
              <Button
                onClick={() => setShowCategoryModal(true)}
                variant="outline"
                className="mt-4"
              >
                Add your first category
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <Tabs
          defaultValue={Object.keys(groupedCategories)[0] || ''}
          className="w-full"
        >
          <TabsList className="mb-8 flex-wrap h-auto py-2">
            {Object.keys(groupedCategories).map((sportName) => (
              <TabsTrigger key={sportName} value={sportName} className="gap-2">
                <Trophy className="w-4 h-4" />
                {sportName}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(groupedCategories).map(([sportName, categories]) => (
            <TabsContent key={sportName} value={sportName}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                  <Card
                    key={category.sportCategoryID}
                    className="overflow-hidden hover:shadow-lg transition-shadow"
                    // onClick={() =>
                    //   category.sportCategoryID &&
                    //   handleViewMatch(category.sportCategoryID)
                    // }
                  >
                    {category.imageUrl && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={category.imageUrl}
                          alt={category.sportCategoryName}
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                    )}
                    <CardHeader className="space-y-1">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">
                          {category.sportCategoryName}
                        </CardTitle>
                        {isSignedIn && (
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() =>
                              category.sportCategoryID &&
                              confirmDelete(
                                category.sportCategoryID,
                                'category',
                                category.sportCategoryName
                              )
                            }
                            className="text-destructive hover:text-destructive/90"
                          >
                            <Trash className="w-4 h-4" color="white" />
                          </Button>
                        )}
                      </div>
                      <CardDescription>{sportName}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Medal className="w-5 h-5 text-yellow-500" />
                          <span className="text-sm">
                            {category.goldMedal || 'Not yet determined'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Medal className="w-5 h-5 text-gray-400" />
                          <span className="text-sm">
                            {category.silverMedal || 'Not yet determined'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Medal className="w-5 h-5 text-amber-600" />
                          <span className="text-sm">
                            {category.bronzeMedal || 'Not yet determined'}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="secondary"
                        onClick={() =>
                          category.sportCategoryID &&
                          handleViewMatch(category.sportCategoryID)
                        }
                      >
                        View Matches
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}

      {/* All modals */}
      {showSportModal && (
        <AddSportsModal
          existingSports={sportsList}
          onClose={() => setShowSportModal(false)}
          onAddSport={handleAddSport}
          onDeleteSport={handleDeleteSport}
        />
      )}

      {showCategoryModal && (
        <AddSportCategoryModal
          existingSports={sportsList}
          existingCategories={sportCategories}
          onClose={() => setShowCategoryModal(false)}
          onAddCategory={handleAddSportCategory}
        />
      )}

      {/* Delete confirmation modal */}
      <DeleteConfirmPopup
        isOpen={deleteConfirm.show}
        onClose={() =>
          setDeleteConfirm({ show: false, id: null, type: 'sport', name: '' })
        }
        onConfirm={handleDeleteConfirm}
        itemType={deleteConfirm.type}
        itemName={deleteConfirm.name}
      />
    </div>
  );
};

export default SportPage;

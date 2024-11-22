// mockData.ts

export type BadmintonMatchType = {
    id: string;
    category: "Men's Singles" | "Women's Singles" | "Men's Doubles" | "Women's Doubles" | "Mixed Doubles";
    playerA: string;
    playerB: string;
    venue: string;
    date: string;
    time: string;
    status: 'upcoming' | 'ongoing' | 'completed';
    scoreA?: number;
    scoreB?: number;
    desasiswaA: string;
    desasiswaB: string;
  };
  
  export const badmintonCategories = [
    "All Categories",
    "Men's Singles",
    "Women's Singles",
    "Men's Doubles",
    "Women's Doubles",
    "Mixed Doubles"
  ] as const;

  export const badmintonEventDetails = {
    title: "Badminton",
    about: "Badminton events in SUKAD feature intense competitions across singles and doubles categories. Matches are played at the USM Sports Complex, showcasing the best talent from each Desasiswa.",
    previousChampion: "Desasiswa Restu",
    venue: "USM Sports Complex",
    image: "https://images.unsplash.com/photo-1721760886493-61c47c1caec9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  };
  
  export const badmintonMatches: BadmintonMatchType[] = [
    // Current Matches
    {
      id: 'bdm-001',
      category: "Men's Singles",
      playerA: "Ahmad Faiz",
      playerB: "Muhammad Hafiz",
      venue: "Sports Complex Court 1",
      date: "2024-11-23",
      time: "10:00 AM",
      status: "ongoing",
      desasiswaA: "Restu",
      desasiswaB: "Tekun"
    },
    
    // Upcoming Matches
    {
      id: 'bdm-002',
      category: "Women's Singles",
      playerA: "Nurul Ain",
      playerB: "Sarah Lim",
      venue: "Sports Complex Court 2",
      date: "2024-11-23",
      time: "11:30 AM",
      status: "upcoming",
      desasiswaA: "Saujana",
      desasiswaB: "Indah Kembara"
    },
    {
      id: 'bdm-003',
      category: "Men's Doubles",
      playerA: "Ali & Abu",
      playerB: "John & James",
      venue: "Sports Complex Court 1",
      date: "2024-11-23",
      time: "2:00 PM",
      status: "upcoming",
      desasiswaA: "Cahaya Gemilang",
      desasiswaB: "Fajar Harapan"
    },
    {
      id: 'bdm-006',
      category: "Women's Doubles",
      playerA: "Siti & Sarah",
      playerB: "Ming & Lee",
      venue: "Sports Complex Court 3",
      date: "2024-11-23",
      time: "3:30 PM",
      status: "upcoming",
      desasiswaA: "Restu",
      desasiswaB: "Tekun"
    },
    {
      id: 'bdm-007',
      category: "Men's Singles",
      playerA: "Raju Kumar",
      playerB: "David Tan",
      venue: "Sports Complex Court 1",
      date: "2024-11-24",
      time: "9:00 AM",
      status: "upcoming",
      desasiswaA: "Cahaya Gemilang",
      desasiswaB: "Indah Kembara"
    },
    {
      id: 'bdm-008',
      category: "Women's Singles",
      playerA: "Lily Wong",
      playerB: "Amira Hassan",
      venue: "Sports Complex Court 2",
      date: "2024-11-24",
      time: "10:30 AM",
      status: "upcoming",
      desasiswaA: "Fajar Harapan",
      desasiswaB: "Saujana"
    },
    {
      id: 'bdm-009',
      category: "Men's Doubles",
      playerA: "Raj & Kumar",
      playerB: "Zain & Amir",
      venue: "Sports Complex Court 1",
      date: "2024-11-24",
      time: "2:00 PM",
      status: "upcoming",
      desasiswaA: "Tekun",
      desasiswaB: "Restu"
    },
    {
      id: 'bdm-010',
      category: "Mixed Doubles",
      playerA: "Ali & Nurul",
      playerB: "John & Sarah",
      venue: "Sports Complex Court 3",
      date: "2024-11-24",
      time: "3:30 PM",
      status: "upcoming",
      desasiswaA: "Indah Kembara",
      desasiswaB: "Cahaya Gemilang"
    },
  
    // Past Matches
    {
      id: 'bdm-004',
      category: "Women's Singles",
      playerA: "Lisa Khoo",
      playerB: "Fatimah Ibrahim",
      venue: "Sports Complex Court 1",
      date: "2024-11-22",
      time: "2:00 PM",
      status: "completed",
      scoreA: 21,
      scoreB: 18,
      desasiswaA: "Aman Damai",
      desasiswaB: "Lembaran"
    },
    {
      id: 'bdm-005',
      category: "Mixed Doubles",
      playerA: "Adam & Eve",
      playerB: "Jack & Rose",
      venue: "Sports Complex Court 2",
      date: "2024-11-22",
      time: "3:30 PM",
      status: "completed",
      scoreA: 21,
      scoreB: 15,
      desasiswaA: "Bakti Permai",
      desasiswaB: "Cahaya Gemilang"
    }
  ];
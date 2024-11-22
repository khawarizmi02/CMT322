// mockVolleyballData.ts

export type VolleyballMatchType = {
    id: string;
    category: "Men's Volleyball" | "Women's Volleyball" | "Mixed Volleyball";
    teamA: string;
    teamB: string;
    venue: string;
    date: string;
    time: string;
    status: 'upcoming' | 'ongoing' | 'completed';
    scoreA?: number;
    scoreB?: number;
    desasiswaA: string;
    desasiswaB: string;
  };
  
  export const volleyballCategories = [
    "All Categories",
    "Men's Volleyball",
    "Women's Volleyball",
    "Mixed Volleyball"
  ] as const;

  export const volleyballEventDetails = {
    title: "Volleyball",
    about: "Volleyball events in SUKAD feature thrilling matches across men's, women's, and mixed categories. Games are held at the Indoor Stadium, highlighting the top teams from each Desasiswa.",
    previousChampion: "Desasiswa Tekun",
    venue: "Indoor Stadium",
    image: "https://images.unsplash.com/photo-1665406857477-e19222ca862c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  };
  
  export const volleyballMatches: VolleyballMatchType[] = [
    // Current Matches
    {
      id: 'vbm-001',
      category: "Men's Volleyball",
      teamA: "Restu Lions",
      teamB: "Tekun Hawks",
      venue: "Indoor Stadium Court 1",
      date: "2024-11-23",
      time: "10:00 AM",
      status: "ongoing",
      scoreA: 2,
      scoreB: 1,
      desasiswaA: "Restu",
      desasiswaB: "Tekun"
    },
  
    // Upcoming Matches
    {
      id: 'vbm-002',
      category: "Women's Volleyball",
      teamA: "Saujana Tigers",
      teamB: "Indah Kembara Panthers",
      venue: "Indoor Stadium Court 2",
      date: "2024-11-23",
      time: "11:30 AM",
      status: "upcoming",
      desasiswaA: "Saujana",
      desasiswaB: "Indah Kembara"
    },
    {
      id: 'vbm-003',
      category: "Mixed Volleyball",
      teamA: "Cahaya Gemilang Stars",
      teamB: "Fajar Harapan Flames",
      venue: "Indoor Stadium Court 1",
      date: "2024-11-23",
      time: "2:00 PM",
      status: "upcoming",
      desasiswaA: "Cahaya Gemilang",
      desasiswaB: "Fajar Harapan"
    },
    {
      id: 'vbm-006',
      category: "Women's Volleyball",
      teamA: "Restu Queens",
      teamB: "Tekun Amazons",
      venue: "Indoor Stadium Court 3",
      date: "2024-11-23",
      time: "3:30 PM",
      status: "upcoming",
      desasiswaA: "Restu",
      desasiswaB: "Tekun"
    },
    {
      id: 'vbm-007',
      category: "Men's Volleyball",
      teamA: "Cahaya Gemilang Warriors",
      teamB: "Indah Kembara Knights",
      venue: "Indoor Stadium Court 1",
      date: "2024-11-24",
      time: "9:00 AM",
      status: "upcoming",
      desasiswaA: "Cahaya Gemilang",
      desasiswaB: "Indah Kembara"
    },
    {
      id: 'vbm-008',
      category: "Women's Volleyball",
      teamA: "Fajar Harapan Angels",
      teamB: "Saujana Titans",
      venue: "Indoor Stadium Court 2",
      date: "2024-11-24",
      time: "10:30 AM",
      status: "upcoming",
      desasiswaA: "Fajar Harapan",
      desasiswaB: "Saujana"
    },
    {
      id: 'vbm-009',
      category: "Men's Volleyball",
      teamA: "Tekun Spartans",
      teamB: "Restu Wolves",
      venue: "Indoor Stadium Court 1",
      date: "2024-11-24",
      time: "2:00 PM",
      status: "upcoming",
      desasiswaA: "Tekun",
      desasiswaB: "Restu"
    },
    {
      id: 'vbm-010',
      category: "Mixed Volleyball",
      teamA: "Indah Kembara Legends",
      teamB: "Cahaya Gemilang Comets",
      venue: "Indoor Stadium Court 3",
      date: "2024-11-24",
      time: "3:30 PM",
      status: "upcoming",
      desasiswaA: "Indah Kembara",
      desasiswaB: "Cahaya Gemilang"
    },
  
    // Past Matches
    {
      id: 'vbm-004',
      category: "Women's Volleyball",
      teamA: "Aman Damai Doves",
      teamB: "Lembaran Phoenix",
      venue: "Indoor Stadium Court 1",
      date: "2024-11-22",
      time: "2:00 PM",
      status: "completed",
      scoreA: 3,
      scoreB: 1,
      desasiswaA: "Aman Damai",
      desasiswaB: "Lembaran"
    },
    {
      id: 'vbm-005',
      category: "Mixed Volleyball",
      teamA: "Bakti Permai Orcas",
      teamB: "Cahaya Gemilang Sharks",
      venue: "Indoor Stadium Court 2",
      date: "2024-11-22",
      time: "3:30 PM",
      status: "completed",
      scoreA: 3,
      scoreB: 2,
      desasiswaA: "Bakti Permai",
      desasiswaB: "Cahaya Gemilang"
    }
  ];
  
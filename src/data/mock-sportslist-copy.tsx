// mockData.ts

export type SportCategoryParticipants = {
  name: string;
  role?: string;
  matricNo: string;
  score?: number;
  record?: string;
};

export type MatchesTeams = {
  name: string;
  score?: number;
  record?: string;
  desasiswa: string;
  participants?: SportCategoryParticipants[];
};

export type MatchesList = {
  id: string;
  match: string;
  date: string;
  time?: string;
  status?: 'upcoming' | 'ongoing' | 'completed';
  venue?: string;
  teams?: MatchesTeams[];
  participants?: SportCategoryParticipants[];
  winner?: string;
};

export type SportsCategory = {
  id: string;
  category: string;
  image: string;
  matches: MatchesList[];
};

export type SportsListCopy = {
  id: string;
  title: string;
  description?: string;
  categories?: SportsCategory[];
};

export const SportsListDetailsCopy: SportsListCopy[] = [
  {
    id: 'splist-001',
    title: 'Badminton',
    categories: [
      {
        id: 'cat-001',
        category: "Men's Single",
        image:
          'https://images.unsplash.com/photo-1721760886493-61c47c1caec9?q=80&w=1887&auto=format&fit=crop',
        matches: [
          {
            id: 'match-001',
            match: 'Semi-Final 1',
            date: '2024-12-01',
            time: '10:00 AM',
            status: 'completed',
            venue: 'Sports Hall A',
            participants: [
              {
                name: 'John Doe',
                role: 'Player',
                matricNo: 'A123456',
                score: 21,
              },
              {
                name: 'Alex Tan',
                role: 'Player',
                matricNo: 'B654321',
                score: 19,
              },
            ],
            winner: 'John Doe',
          },
        ],
      },
      {
        id: 'cat-002',
        category: "Women's Single",
        image:
          'https://images.unsplash.com/photo-1721760886493-61c47c1caec9?q=80&w=1887&auto=format&fit=crop',
        matches: [
          {
            id: 'match-002',
            match: 'Quarter-Final 2',
            date: '2024-12-02',
            time: '2:00 PM',
            status: 'completed',
            venue: 'Sports Hall B',
            participants: [
              {
                name: 'Jane Smith',
                role: 'Player',
                matricNo: 'C789012',
                score: 15,
              },
              {
                name: 'Emily Wong',
                role: 'Player',
                matricNo: 'D210987',
                score: 21,
              },
            ],
            winner: 'Emily Wong',
          },
        ],
      },
    ],
  },
  {
    id: 'splist-002',
    title: 'Volleyball',
    categories: [
      {
        id: 'cat-003',
        category: "Women's Team",
        image:
          'https://images.unsplash.com/photo-1721760886493-61c47c1caec9?q=80&w=1887&auto=format&fit=crop',
        matches: [
          {
            id: 'match-003',
            match: 'Group Stage Match 1',
            date: '2024-12-03',
            time: '4:00 PM',
            status: 'upcoming',
            venue: 'Court 2',
            teams: [
              {
                name: 'Team Alpha',
                desasiswa: 'Desasiswa Harapan',
                score: 2,
                participants: [
                  { name: 'Sophia Lim', role: 'Captain', matricNo: 'E112233' },
                  { name: 'Grace Chan', role: 'Player', matricNo: 'F445566' },
                ],
              },
              {
                name: 'Team Beta',
                desasiswa: 'Desasiswa Murni',
                score: 3,
                participants: [
                  { name: 'Olivia Tan', role: 'Captain', matricNo: 'G778899' },
                  { name: 'Rachel Ng', role: 'Player', matricNo: 'H990011' },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'splist-003',
    title: 'Netball',
    categories: [
      {
        id: 'cat-004',
        category: 'Mixed Team',
        image:
          'https://images.unsplash.com/photo-1721760886493-61c47c1caec9?q=80&w=1887&auto=format&fit=crop',
        matches: [
          {
            id: 'match-004',
            match: 'Final',
            date: '2024-12-04',
            time: '6:00 PM',
            status: 'ongoing',
            venue: 'Indoor Arena',
            teams: [
              {
                name: 'Team Galaxy',
                desasiswa: 'Desasiswa Amanah',
                participants: [
                  { name: 'Adam Lee', role: 'Captain', matricNo: 'I223344' },
                  { name: 'Sarah Tan', role: 'Player', matricNo: 'J556677' },
                ],
              },
              {
                name: 'Team Comet',
                desasiswa: 'Desasiswa Harmoni',
                participants: [
                  { name: 'Ethan Ng', role: 'Captain', matricNo: 'K889900' },
                  { name: 'Liam Teh', role: 'Player', matricNo: 'L001122' },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'splist-004',
    title: 'Football',
    categories: [
      {
        id: 'cat-005',
        category: "Men's Team",
        image:
          'https://images.unsplash.com/photo-1721760886493-61c47c1caec9?q=80&w=1887&auto=format&fit=crop',
        matches: [
          {
            id: 'match-005',
            match: 'Knockout Round',
            date: '2024-12-05',
            time: '8:00 PM',
            status: 'upcoming',
            venue: 'Main Field',
            teams: [
              {
                name: 'Team Warriors',
                desasiswa: 'Desasiswa Bakti',
                participants: [
                  { name: 'Daniel Lee', role: 'Striker', matricNo: 'M334455' },
                  {
                    name: 'Michael Ong',
                    role: 'Goalkeeper',
                    matricNo: 'N667788',
                  },
                ],
              },
              {
                name: 'Team Titans',
                desasiswa: 'Desasiswa Sejahtera',
                participants: [
                  {
                    name: 'Nathan Chan',
                    role: 'Midfielder',
                    matricNo: 'O990011',
                  },
                  { name: 'Chris Ho', role: 'Defender', matricNo: 'P112233' },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

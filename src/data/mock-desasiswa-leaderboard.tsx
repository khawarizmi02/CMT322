export type DesasiswaLeaderboardType = {
  id: string;
  desasiswa: string;
  bronze: number;
  silver: number;
  gold: number;
  points: number;
};

export const desasiswaLeaderboard: DesasiswaLeaderboardType[] = [
  {
    id: 'desa-001',
    desasiswa: 'Desasiswa Tekun',
    bronze: 2,
    silver: 1,
    gold: 1,
    points: 5,
  },
  {
    id: 'desa-002',
    desasiswa: 'Desasiswa Bakti Fajar PETAS',
    bronze: 1,
    silver: 1,
    gold: 0,
    points: 3,
  },
  {
    id: 'desa-003',
    desasiswa: 'Desasiswa Jaya Lembaran Utama',
    bronze: 0,
    silver: 1,
    gold: 1,
    points: 3,
  },
  {
    id: 'desa-004',
    desasiswa: 'Desasiswa Murni Nurani',
    bronze: 1,
    silver: 0,
    gold: 1,
    points: 3,
  },
  {
    id: 'desa-005',
    desasiswa: 'Desasiswa Restu',
    bronze: 0,
    silver: 1,
    gold: 0,
    points: 1,
  },
  {
    id: 'desa-006',
    desasiswa: 'Desasiswa Cahaya Gemilang Harapan',
    bronze: 0,
    silver: 0,
    gold: 1,
    points: 1,
  },
];

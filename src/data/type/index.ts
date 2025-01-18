//Type definition for the data type

//Assume that the sport list is already pre determined before the event.
//User just need to register the sport for what phase only.
//User can't add new sport to the list without admin help etc.

/* SPORTS AND MATCHES MODULE */
export const DESASISWA_LIST = [
  'Aman Damai',
  'Bakti Permai',
  'Cahaya Gemilang',
  'Fajar Harapan',
  'Indah Kembara',
  'Jaya Lembaran Utama',
  'Murni Nurani',
  'Restu',
  'Saujana',
  'Tekun',
] as const;

export const SPORTS_LIST = ['Badminton', 'Track', 'Volleyball'] as const;

export const BADMINTON_CATEGORIES = [
  "Men's Singles",
  "Women's Singles",
  "Men's Doubles",
  "Women's Doubles",
] as const;

export const TRACKS_CATEGORIES = [
  "Men's 100m",
  "Men's 200m",
  "Men's 400m",
  "Women's 100m",
  "Women's 200m",
  "Women's 400m",
  "Men's 4x100m Relay",
  "Women's 4x100m Relay",
] as const;

export const VOLLEYBALL_CATEGORIES = [
  "Men's Volleyball",
  "Women's Volleyball",
] as const;

export type sports = {
  sportID?: string; //Used when fetching the data
  sportName: string;
};

export type sportCategory = {
  sportID: string;
  sportCategoryID?: string; //Used when fetching the data
  sportName?: string; //Used when fetching the data
  sportCategoryName: string;
  sportRef?: string; // refer to sports
  imageUrl?: string;
  goldMedal?: string; //Refer to overall winner
  silverMedal?: string; //Refer to overall winner
  bronzeMedal?: string; //Refer to overall winner
};

export type matches = {
  matchID?: string;
  sportID: string; // refer to sports
  matchDate?: string;
  matchTime?: string;
  matchStatus?: 'upcoming' | 'ongoing' | 'completed';
  matchVenue?: string;
  matchWinner?: string;
  matchScore?: string;
  teams?: matchesTeam[]; // refer to participants
  participants?: matchesParticipant[]; // refer to participants
  sportName: string; //Duplicate data to make it easier to query and filter
  sportCategory: string; //Duplicate data to make it easier to query and filter
  sportCategoryID: string; // refer to sportCategory
};

export type matchesParticipant = {
  name: string;
  matricNo: string;
  desasiswa?: string; //only filled if the participated in non team sport
};

export type matchesTeam = {
  name: string;
  desasiswa?: string; //A team can only represent one desasiswa
  participants?: matchesParticipant[]; // refer to participants
};

/* NEWS MODULE */
export type news = {
  newsID?: string;
  title: string;
  content: string;
  date: string;
  lastUpdated?: string;
  imageUrl?: string;
  type: 'news' | 'announcement';
  tags?: string[];
};

/* SESSION MODULE */
export type sessions = {
  session_id?: string;
  user_id: string;
  client_id: string;
  created_at: string;
  expire_at: string;
  last_active_at: string;
  status: string;
  updated_at: string;
  abandon_at: string;
};

export type SessionEvent =
  | 'session.created'
  | 'session.ended'
  | 'session.revoked'
  | 'session.removed'
  | 'session.pending';

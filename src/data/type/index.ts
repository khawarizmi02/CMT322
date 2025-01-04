//Type definition for the data type

export const SPORTS_LIST = [
    'Badminton',
    'Track',
    'Volleyball',
] as const;

export const BADMINTON_CATEGORIES = [
    'Men\'s Single Badminton',
    'Women\'s Single Badminton',
    'Men\'s Double Badminton',
    'Women\'s Double Badminton',
] as const;

export const TRACKS_CATEGORIES = [
    'Men\'s 100m',
    'Men\'s 200m',
    'Men\'s 400m',
    'Women\'s 100m',
    'Women\'s 200m',
    'Women\'s 400m',
    'Men\'s 4x100m Relay',
    'Women\'s 4x100m Relay',
] as const;

export const VOLLEYBALL_CATEGORIES = [
    'Men\'s Volleyball',
    'Women\'s Volleyball',
] as const;

export type sports = {
    sportID: string;
    sportName: string;
    sportCategory: string;
}
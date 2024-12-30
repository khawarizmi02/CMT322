import { TableCell } from '../ui/table';
import { BadmintonLeaderboardType } from '@/data/mock-badminton';
import { VolleyballLeaderboardType } from '@/data/mock-volleyball';
import { LeaderboardDataType } from '../Leaderboard';
import { JSX } from 'react';

// Define a configuration object for each sport
const leaderboardConfig: {
  [key: string]: {
    columns: string[];
    renderRow: (item: any) => JSX.Element;
  };
} = {
  badminton: {
    columns: ['Player', 'Desasiswa', 'Win', 'Loss', 'Points'],
    renderRow: (item: BadmintonLeaderboardType) => (
      <>
        <TableCell className="font-medium">{item.participant}</TableCell>
        <TableCell>{item.desasiswa}</TableCell>
        <TableCell>{item.win}</TableCell>
        <TableCell>{item.loss}</TableCell>
        <TableCell className="text-right">{item.points}</TableCell>
      </>
    ),
  },
  volleyball: {
    columns: ['Team', 'Desasiswa', 'Win', 'Loss', 'Points'],
    renderRow: (item: VolleyballLeaderboardType) => (
      <>
        <TableCell>{item.team}</TableCell>
        <TableCell>{item.desasiswa}</TableCell>
        <TableCell>{item.win}</TableCell>
        <TableCell>{item.loss}</TableCell>
        <TableCell>{item.points}</TableCell>
      </>
    ),
  },
  // Add more sports configurations here
};

export default leaderboardConfig;

import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { BadmintonLeaderboardType } from '@/data/mock-badminton';
import { VolleyballLeaderboardType } from '@/data/mock-volleyball';

import leaderboardConfig from './config/leaderboardConfig';

export type LeaderboardDataType =
  | BadmintonLeaderboardType
  | VolleyballLeaderboardType;

interface LeaderboardProps {
  data: LeaderboardDataType[];
  event: string;
  category: string;
}

const Leaderboard: React.FC<LeaderboardProps> = ({
  data = [],
  event,
  category,
}) => {
  const config = leaderboardConfig[event.toLowerCase()];

  if (!config) {
    return null;
  }

  return (
    <Table>
      <TableCaption className="capitalize">
        Leaderboard for {event}, {category}{' '}
      </TableCaption>
      <TableHeader className="bg-primary">
        <TableRow>
          {config.columns.map((column, index) =>
            index === 0 ? (
              <TableHead key={column} className="rounded-tl-lg text-black">
                {column}
              </TableHead>
            ) : index === config.columns.length - 1 ? (
              <TableHead
                key={column}
                className="rounded-tr-lg text-black text-right"
              >
                {column}
              </TableHead>
            ) : (
              <TableHead key={column} className="text-black">
                {column}
              </TableHead>
            )
          )}
          {/* <TableHead className="rounded-tl-lg text-black">Athlete</TableHead>
          <TableHead className="text-black">Desasiswa</TableHead>
          <TableHead className="text-black">Win</TableHead>
          <TableHead className="text-black">Loss</TableHead>
          <TableHead className="text-right text-black rounded-tr-lg">
            Points
          </TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            {config.renderRow(item)}
            {/* <TableCell className="font-medium">{item.participant}</TableCell>
            <TableCell>{item.desasiswa}</TableCell>
            <TableCell>{item.win}</TableCell>
            <TableCell>{item.loss}</TableCell>
            <TableCell className="text-right">{item.points}</TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Leaderboard;

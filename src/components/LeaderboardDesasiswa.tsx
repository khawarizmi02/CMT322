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

import { DesasiswaLeaderboardType } from '@/data/mock-desasiswa-leaderboard';
import { desasiswaLeaderboard } from '@/data/mock-desasiswa-leaderboard';

import leaderboardConfig from './config/leaderboardConfig';

const LeaderboardDesasiswa: React.FC = () => {
  return (
    <Table>
      <TableCaption className="capitalize">
        Leaderboard for Desasiswa
      </TableCaption>
      <TableHeader className="bg-primary">
        <TableRow className="w-full">
          <TableHead className="rounded-tl-lg text-black">Desasiswa</TableHead>
          <TableHead className="text-black text-center">Bronze</TableHead>
          <TableHead className="text-black text-center">Silver</TableHead>
          <TableHead className="text-black text-center">Gold</TableHead>
          <TableHead className="rounded-tr-lg text-black text-right">
            Points
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {desasiswaLeaderboard.map((data: DesasiswaLeaderboardType) => (
          <TableRow key={data.id}>
            <TableCell>{data.desasiswa}</TableCell>
            <TableCell className="text-center">{data.bronze}</TableCell>
            <TableCell className="text-center">{data.silver}</TableCell>
            <TableCell className="text-center">{data.gold}</TableCell>
            <TableCell className="text-right">{data.points}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default LeaderboardDesasiswa;

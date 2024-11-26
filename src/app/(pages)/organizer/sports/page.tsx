//SHow all sports
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

import { SportsListDetails } from '@/data/mock-sportslist';
import { SportsListDetailsCopy, SportsListCopy } from '@/data/mock-sportslist-copy';

const Sports: React.FC = () => {

  const router = useRouter();

  const handleClick = (sport: string) => {
    router.push(`/organizer/sports/${sport}`)
    console.log("clicked")
  };
    
  return (
    <div>
      <div>Sport</div>
        <div>
          {SportsListDetailsCopy.map((sport) => (
            // <div key={sport.id} onClick={() => handleClick(sport.title)}>
                  // <img src={category.image} alt={sport.title} />
                  // <div>{category.category}</div>
            <div key={sport.id} onClick={() => handleClick(sport.title)}>
              { sport.categories?.map(( category ) => (
                <div>
                  <img src={category.image} alt={sport.title} />
                  <div>{category.category}</div>
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Sports;

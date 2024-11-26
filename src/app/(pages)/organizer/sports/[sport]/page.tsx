'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SportsListDetails, SportsList } from '@/data/mock-sportslist';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { SportsListDetailsCopy, SportsListCopy } from '@/data/mock-sportslist-copy';

const SportDetailPage = ({ params }: { params: { sport: string } }) => {
    const router = useRouter();
    // const { sport } = router.query;
  	const [isClient, setIsClient] = useState(false)
    const [event, setEvent] = useState<SportsListCopy | null>(null);

	const sportName = params.sport

  useEffect(() => {
    if (sportName) {
      const eventDetails = SportsListDetailsCopy.find(event => event.title === sportName);
      setEvent(eventDetails || null);
    }
		setIsClient(true)
  }, []);

  if (!event) {
    return <div>Loading...</div>;
  }

	console.log(event)

  return () => (
    <div>
			{ isClient && (

        <Card>
            <CardHeader>
            <CardTitle>{event.title}</CardTitle>
            </CardHeader>
            <CardContent>
            {event.categories?.map((category) => (
                <div key={category.id}>
                <img src={category.image} alt={category.category} />
                <CardDescription>{category.category}</CardDescription>
                </div>
            ))}
            </CardContent>
        </Card>
			)}
        </div>
    );
}

export default SportDetailPage
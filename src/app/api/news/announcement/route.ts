import { NextResponse } from 'next/server';

import firestore from '@/lib/firebase/firestore';

export async function GET() {
  try {
    // Read all documents in the 'News' collection
    const announcementList = await firestore.readAnnouncements();

    return NextResponse.json({ announcementList });
  } catch (error) {
    console.error('Error reading news:', error);
    return new NextResponse('Error reading news', { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { isSignedIn } from '@/utils/roles';

import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/firebase';

import firestore from '@/lib/firebase/firestore';

export async function POST(req: NextRequest) {
  // Check if the user is signed in
  if (!(await isSignedIn())) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const data = await req.json(); // Parse the request body

    console.log('Data received:', data);

    // Add a new document with a generated ID

    const news = firestore.createNews(data);

    if (!news) {
      return new NextResponse('Error creating news', { status: 500 });
    }

    return NextResponse.json({ infoId: news });
  } catch (error) {
    console.error('Error writing info:', error);
    return new NextResponse('Error writing info', { status: 500 });
  }
}

export async function GET() {
  try {
    // Read all documents in the 'News' collection
    const newsList = await firestore.getAllNews();
    console.log('newsList from server:', newsList);

    return NextResponse.json({ newsList });
  } catch (error) {
    console.error('Error reading news:', error);
    return new NextResponse('Error reading news', { status: 500 });
  }
}

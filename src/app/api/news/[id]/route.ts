import { NextRequest, NextResponse } from 'next/server';
import { isSignedIn } from '@/utils/roles';

import firestore from '@/lib/firebase/firestore';
import { id } from 'date-fns/locale';

export async function GET(params: { params: { id: string } }) {
  const id = params.params.id;
  try {
    // Read all documents in the 'News' collection
    const newsList = await firestore.readNews(id);

    return NextResponse.json({ newsList });
  } catch (error) {
    console.error('Error reading news:', error);
    return new NextResponse('Error reading news', { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // Check if the user is signed in
  if (!(await isSignedIn())) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const data = await req.json(); // Parse the request body
    const id = params.id;

    console.log('Data received:', data);

    // Update a document
    const news = firestore.updateNews(id, data);

    if (!news) {
      return new NextResponse('Error updating news', { status: 500 });
    }

    return NextResponse.json({ infoId: news });
  } catch (error) {
    console.error('Error updating news:', error);
    return new NextResponse('Error updating news', { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // Check if the user is signed in
  if (!(await isSignedIn())) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const id = params.id;

    // Delete a document
    const news = firestore.deleteNews(id);

    if (!news) {
      return new NextResponse('Error deleting news', { status: 500 });
    }

    return NextResponse.json({ infoId: news });
  } catch (error) {
    console.error('Error deleting news:', error);
    return new NextResponse('Error deleting news', { status: 500 });
  }
}

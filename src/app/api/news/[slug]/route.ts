import { NextRequest, NextResponse } from 'next/server';
import { isSignedIn } from '@/utils/roles';
import firestore from '@/lib/firebase/firestore';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('slug');
  if (!id) {
    return new NextResponse('ID is required', { status: 400 });
  }
  try {
    // Read the document with the specified id in the 'News' collection
    const newsList = await firestore.readNews(id);

    return NextResponse.json({ newsList });
  } catch (error) {
    console.error('Error reading news:', error);
    return new NextResponse('Error reading news', { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const data = await req.json(); // Parse the request body
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('slug');
  // Check if the user is signed in
  if (!(await isSignedIn())) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    console.log('Data received:', data);

    // Update a document
    if (!id) {
      return new NextResponse('ID is required', { status: 400 });
    }

    const news = await firestore.updateNews(id, data);

    if (!news) {
      return new NextResponse('Error updating news', { status: 500 });
    }

    return NextResponse.json({ infoId: news });
  } catch (error) {
    console.error('Error updating news:', error);
    return new NextResponse('Error updating news', { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('slug');
  // Check if the user is signed in
  if (!(await isSignedIn())) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    if (!id) {
      return new NextResponse('ID is required', { status: 400 });
    }

    // Delete a document
    const news = await firestore.deleteNews(id);

    if (!news) {
      return new NextResponse('Error deleting news', { status: 500 });
    }

    return NextResponse.json({ infoId: news });
  } catch (error) {
    console.error('Error deleting news:', error);
    return new NextResponse('Error deleting news', { status: 500 });
  }
}

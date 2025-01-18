import { NextRequest, NextResponse } from 'next/server';
import { isSignedIn } from '@/utils/roles';
import firestore from '@/lib/firebase/firestore';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('sportCategoryID');
  if (!id) {
    return new NextResponse('ID is required', { status: 400 });
  }
  try {
    // Read the document with the specified id in the 'News' collection
    const newsList = await firestore.readMatchesBySportCategory(id);

    return NextResponse.json({ newsList });
  } catch (error) {
    console.error('Error reading news:', error);
    return new NextResponse('Error reading news', { status: 500 });
  }
}

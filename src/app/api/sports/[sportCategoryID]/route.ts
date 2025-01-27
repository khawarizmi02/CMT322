import { NextRequest, NextResponse } from 'next/server';
import { isSignedIn } from '@/utils/roles';
import firestore from '@/lib/firebase/firestore';

export async function GET(req: NextRequest) {
  // const { searchParams } = new URL(req.url);
  // const id = searchParams.get('sportCategoryID');

  const url = new URL(req.url);
  const id = url.pathname.split('/').pop();
  if (!id) {
    return new NextResponse('ID is required', { status: 400 });
  }
  try {
    // Read the document with the specified id in the 'News' collection
    const matches = await firestore.readMatchesBySportCategory(id);

    return NextResponse.json({ matches });
  } catch (error) {
    console.error('Error retrieving matches data:', error);
    return new NextResponse('Error retrieving matches data', { status: 500 });
  }
}

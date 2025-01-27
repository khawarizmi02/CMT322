
import { NextRequest, NextResponse } from 'next/server';
import { isSignedIn } from '@/utils/roles';
import firestore from '@/lib/firebase/firestore';

export async function GET(req: NextRequest) {
  try {
    // Extract sportCategoryID from URL path
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();

    // Validate id
    if (!id) {
      return NextResponse.json(
        { error: 'Sport Category ID is required' }, 
        { status: 400 }
      );
    }

    // Fetch matches data
    const matches = await firestore.readMatchesBySportCategory(id);

    // Return empty array if no matches found
    if (!matches || matches.length === 0) {
      return NextResponse.json({ matches: [] });
    }

    // Return matches data
    return NextResponse.json({ matches });

  } catch (error) {
    console.error('Error retrieving matches:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve matches' }, 
      { status: 500 }
    );
  }
}
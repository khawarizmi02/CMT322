import { NextRequest, NextResponse } from 'next/server';
import { isSignedIn } from '@/utils/roles';
import firestore from '@/lib/firebase/firestore';

export async function PATCH(req: NextRequest) {
  if (!(await isSignedIn())) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const { pathname } = new URL(req.url);
    const pathParts = pathname.split('/');
    const matchID = pathParts[pathParts.indexOf('matches') + 1];
    const body = await req.json();
    const { data } = body;

    if (!matchID) {
      return new NextResponse('ID is required', { status: 400 });
    }

    console.log('Updating match:', matchID, data);

    // Update the match in Firestore
    await firestore.updateMatch(matchID, data);

    return NextResponse.json({ message: 'Match updated' });
  } catch (error) {
    console.error('Error updating match:', error);
    return new NextResponse('Error updating match', { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await isSignedIn())) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const { pathname } = new URL(req.url);
    const pathParts = pathname.split('/');
    const matchID = pathParts[pathParts.indexOf('matches') + 1];

    if (!matchID) {
      return new NextResponse('ID is required', { status: 400 });
    }

    console.log('Deleting match:', matchID);

    // Delete the match from Firestore
    await firestore.deleteMatch(matchID);

    return NextResponse.json({ message: 'Match deleted' });
  } catch (error) {
    console.error('Error deleting match:', error);
    return new NextResponse('Error deleting match', { status: 500 });
  }
}

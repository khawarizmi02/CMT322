import { NextRequest, NextResponse } from 'next/server';
import { isSignedIn } from '@/utils/roles';
import firestore from '@/lib/firebase/firestore';

export async function PATCH(req: NextRequest) {
  if (!(await isSignedIn())) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('matchID');
    const body = await req.json();
    const { data } = body;

    if (!id) {
      return new NextResponse('ID is required', { status: 400 });
    }

    console.log('Updating match:', id, data);

    // Update the match in Firestore
    await firestore.updateMatch(id, data);

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
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('matchID');

    if (!id) {
      return new NextResponse('ID is required', { status: 400 });
    }

    console.log('Deleting match:', id);

    // Delete the match from Firestore
    await firestore.deleteMatch(id);

    return NextResponse.json({ message: 'Match deleted' });
  } catch (error) {
    console.error('Error deleting match:', error);
    return new NextResponse('Error deleting match', { status: 500 });
  }
}

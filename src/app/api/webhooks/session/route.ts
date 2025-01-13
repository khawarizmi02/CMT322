import { NextResponse } from 'next/server';
import { db } from '@/firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';

import firestore from '@/lib/firebase/firestore';

// Create session once session from clerk is created
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { data, type } = body;
    const {
      id,
      user_id,
      client_id,
      created_at,
      expire_at,
      last_active_at,
      status,
      updated_at,
      abandon_at,
    } = data;

    if (type === 'session.created') {
      // Create session in Firestore
      const docRef = await firestore.createSession({
        session_id: id,
        user_id,
        client_id,
        created_at,
        expire_at,
        last_active_at,
        status,
        updated_at,
        abandon_at,
      });

      if (docRef) {
        return NextResponse.json({ session_id: docRef.id });
      } else {
        throw new Error('Failed to create session');
      }
    }

    if (
      type === 'session.ended' ||
      type === 'session.revoked' ||
      type === 'session.removed'
    ) {
      // Update session in Firestore
      const data = {
        user_id,
        client_id,
        created_at,
        expire_at,
        last_active_at,
        status,
        updated_at,
        abandon_at,
      };
      const success = await firestore.updateSession(id, data, type);

      if (success) {
        return NextResponse.json({ session_id: id });
      } else {
        throw new Error('Failed to update session');
      }
    }

    return new NextResponse('Webhook received', { status: 200 });
  } catch (error) {
    console.error('Error creating session:', error);
    return new NextResponse('Error creating session', { status: 500 });
  }
}

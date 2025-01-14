import { NextRequest, NextResponse } from 'next/server';
import { collection, addDoc } from 'firebase/firestore';
import { checkRole } from '@/utils/roles';
import { db } from '@/firebase/firebase';

export async function POST(req: NextRequest) {
    if (!checkRole('admin')) {
        return new NextResponse('Unauthorized', { status: 401 })
    }
    
    try {
        const data = await req.json();

        console.log('Data received:', data);

        // Add a new document with a generated ID
        const docRef = await addDoc(collection(db, 'Matches'), data);

        console.log('Matches created with ID: ', docRef.id);
        return NextResponse.json({ infoId: docRef.id });
    } catch (error) {
        console.error('Error creating matches:', error);
        return new NextResponse('Error creating matches', { status: 500 });
    }
}